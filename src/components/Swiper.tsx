import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  card: {
    position: "absolute",
  },
  otherCard: {
    opacity: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
  },
  overlayHidden: {
    display: "none",
  },
});

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
}

export interface ItemBase {
  id: string;
}

export type Decision = {
  id: ItemBase["id"];
  direction: Direction;
};

export type Swipe = {
  id: ItemBase["id"];
  direction: Direction | null;
};

export type SwiperProps<T extends ItemBase> = {
  /**
   * Data of the items to swipe that are provided to the renderItem function
   * Each item must have a unique `id` property.
   */
  items: T[];
  /**
   * Width of the swiper component
   */
  width: number;
  /**
   * Height of the swiper component
   */
  height: number;
  /**
   * Function to render each item
   * @param item - The item to render
   * @returns React.ReactNode
   */
  renderItem: (item: T) => React.ReactNode;
  /**
   * If true, limit one touch at a time to swipe. Useful for development purposes like accessing expo triple tap
   */
  disableMultiTouch?: boolean;
  /**
   * Initial decisions to start with
   */
  initialDecisions?: Decision[];
  /**
   * Initial index to start with
   */
  initialIndex?: number;
  /**
   * If true, the swiper will loop back to the start when all items have been swiped.
   */
  loop?: boolean;
  /**
   * Callback function called when the index changes
   * @param index - The index of the current item
   */
  onIndexChange?: (index: number) => void;
  /**
   * Callback function called when an item is swiped
   * @param swipe - The swipe information containing the id of the item and the direction of the swipe
   * @param swipe.id - The id of the swiped item
   * @param swipe.direction - The direction of the swipe (left or right)
   */
  onSwipe?: (swipe: Swipe) => void;
  /**
   * Overlay to display on the left side during swipe
   */
  overlayLeft?: JSX.Element;
  /**
   * Overlay to display on the right side during swipe
   */
  overlayRight?: JSX.Element;
  /**
   * Number of items to prerender
   */
  prerenderItemsCount?: number;
  /**
   * Style to apply to the swiper container
   */
  style?: ViewStyle;
  /**
   * Threshold for triggering a swipe action (in px)
   */
  swipeThreshold?: number;
};

export type SwiperRefProps = {
  swipeLeft: () => void;
  swipeRight: () => void;
  swipeBack: () => void;
};

function SwiperComponent<T extends ItemBase>(
  {
    items,
    width,
    height,
    overlayLeft,
    overlayRight,
    renderItem,
    onSwipe,
    disableMultiTouch,
    prerenderItemsCount = 2,
    initialDecisions = [],
    initialIndex = 0,
    onIndexChange,
    style,
    swipeThreshold = 130,
    loop = false,
  }: SwiperProps<T>,
  ref: React.Ref<SwiperRefProps>,
) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);
  const [hideOverlays, setHideOverlays] = useState(false);

  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  const moveIndexForward = useCallback(
    (direction: Direction) => {
      setCurrentIndex((prevIndex) => {
        if (items[prevIndex]) {
          const id = items[prevIndex].id;
          setDecisions((prev) => [...prev, { id, direction }]);
          onSwipe?.({ id, direction });
          return prevIndex + 1 < items.length ? prevIndex + 1 : loop ? 0 : prevIndex;
        }
        return prevIndex;
      });
    },
    [items, onSwipe, loop],
  );

  const moveIndexBackward = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        const previousItem = items[prevIndex - 1];
        const lastDecision = decisions[decisions.length - 1];

        setHideOverlays(true);

        setDecisions((prev) => prev.filter((decision) => decision.id !== previousItem.id));
        onSwipe?.({ id: previousItem.id, direction: null });
        Animated.timing(position, {
          toValue: {
            x: (lastDecision.direction === Direction.LEFT ? -1 : 1) * 1.5 * width,
            y: 0,
          },
          duration: 0,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setHideOverlays(false);
          });
        });

        return prevIndex - 1;
      }
      return prevIndex;
    });
  }, [decisions, items, onSwipe, position, width]);

  const rotate = useMemo(
    () =>
      position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: ["-25deg", "0deg", "20deg"],
        extrapolate: "clamp",
      }),
    [position.x, width],
  );

  const rotateAndTranslate = useMemo(
    () => ({
      transform: [{ rotate }, ...position.getTranslateTransform()],
    }),
    [rotate, position],
  );

  const leftOpacity = useMemo(
    () =>
      position.x.interpolate({
        inputRange: [-width / 4, 0, width / 4],
        outputRange: [1, 0, 0],
        extrapolate: "clamp",
      }),
    [position.x, width],
  );

  const rightOpacity = useMemo(
    () =>
      position.x.interpolate({
        inputRange: [-width / 4, 0, width / 4],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",
      }),
    [position.x, width],
  );

  const nextCardOpacity = useMemo(
    () =>
      position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: [1, 0, 1],
        extrapolate: "clamp",
      }),
    [position.x, width],
  );

  const nextCardScale = useMemo(
    () =>
      position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp",
      }),
    [position.x, width],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (event) =>
        !!disableMultiTouch || event.nativeEvent.touches.length === 1,
      onMoveShouldSetPanResponder: (event) =>
        !!disableMultiTouch || event.nativeEvent.touches.length === 1,
      onPanResponderMove: (_event, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_event, gestureState) => {
        if (gestureState.dx > swipeThreshold) {
          Animated.spring(position, {
            toValue: { x: width * 2, y: 0 },
            speed: 1,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            moveIndexForward(Direction.RIGHT);
            position.setValue({ x: 0, y: 0 });
          }, 150);
        } else if (gestureState.dx < -1 * swipeThreshold) {
          Animated.spring(position, {
            toValue: { x: width * -2, y: 0 },
            speed: 1,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            moveIndexForward(Direction.LEFT);
            position.setValue({ x: 0, y: 0 });
          }, 150);
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const animateSwipe = useCallback(
    (direction: Direction, callback?: () => void) => {
      Animated.timing(position, {
        toValue: {
          x: (direction === Direction.LEFT ? -1 : 1) * 1.5 * width,
          y: 0,
        },
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        moveIndexForward(direction);
        position.setValue({ x: 0, y: 0 });
        callback?.();
      });
    },
    [moveIndexForward, position, width],
  );

  React.useImperativeHandle(
    ref,
    (): SwiperRefProps => ({
      swipeLeft: () => animateSwipe(Direction.LEFT),
      swipeRight: () => animateSwipe(Direction.RIGHT),
      swipeBack: () => moveIndexBackward(),
    }),
  );

  const renderItems = useCallback(() => {
    return items
      .map((item, i) => {
        if (i < currentIndex || i > currentIndex + Math.abs(prerenderItemsCount)) {
          return null;
        }
        const isCurrent = i === currentIndex;
        const isNext = i === currentIndex + 1;
        const isOther = !isCurrent && !isNext;
        return (
          <Animated.View
            {...(isCurrent ? panResponder.panHandlers : {})}
            key={item.id}
            style={[
              styles.card,
              isCurrent && rotateAndTranslate,
              isNext && { opacity: nextCardOpacity, transform: [{ scale: nextCardScale }] },
              isOther && styles.otherCard,
              { height, width },
            ]}
          >
            {!hideOverlays && (overlayLeft || overlayRight) && (
              <>
                {overlayLeft && (
                  <Animated.View
                    style={[
                      styles.overlay,
                      isCurrent ? { opacity: leftOpacity } : styles.overlayHidden,
                    ]}
                  >
                    {overlayLeft}
                  </Animated.View>
                )}
                {overlayRight && (
                  <Animated.View
                    style={[
                      styles.overlay,
                      isCurrent ? { opacity: rightOpacity } : styles.overlayHidden,
                    ]}
                  >
                    {overlayRight}
                  </Animated.View>
                )}
              </>
            )}
            {renderItem(item)}
          </Animated.View>
        );
      })
      .reverse();
  }, [
    currentIndex,
    height,
    hideOverlays,
    items,
    leftOpacity,
    nextCardOpacity,
    nextCardScale,
    overlayLeft,
    overlayRight,
    panResponder.panHandlers,
    prerenderItemsCount,
    renderItem,
    rightOpacity,
    rotateAndTranslate,
    width,
  ]);

  return <View style={[styles.container, style]}>{renderItems()}</View>;
}

/**
 * SwiperComponent is a reusable component for swiping through a list of items.
 * It supports swiping left and right with animations and callbacks for swipe actions.
 *
 * @template T - The type of the items to be swiped, with a prop unique "id".
 *
 * @param {SwiperProps<T>} props - The properties for the SwiperComponent.
 * @param {React.Ref<SwiperRefProps>} ref - The ref to control the swiper externally.
 *
 * @returns {JSX.Element} The rendered SwiperComponent.
 *
 * @example
 * const swiperRef = useRef<SwiperRefProps>(null);
 * <Swiper
 *   ref={swiperRef}
 *   items={data}
 *   width={300}
 *   height={500}
 *   renderItem={(item) => <MyItemComponent item={item} />}
 *   ComponentLeft={LeftOverlayComponent}
 *   ComponentRight={RightOverlayComponent}
 *   onSwipe={(swipe) => console.log(swipe)}
 *   prerenderItemsCount={3}
 * />
 *
 * @example
 * // Using the imperative handler to control the swiper
 * swiperRef.current?.swipeLeft();  // Swipes the current item to the left
 * swiperRef.current?.swipeRight(); // Swipes the current item to the right
 * swiperRef.current?.swipeBack();  // Moves back to the previous item
 */
export const Swiper = React.forwardRef(SwiperComponent);
