import { AssetImage } from "@components/AssetImage";
import { Box } from "@components/Box";
import {
  type Decision,
  type ItemBase,
  type Swipe,
  Swiper,
  type SwiperProps,
  type SwiperRefProps,
} from "@components/Swiper";
import { ButtonCircleIcon } from "@screens/Group/components/ButtonCircleIcon";
import React, { lazy, useCallback, useEffect, useRef, useState } from "react";
import { type LayoutChangeEvent, StyleSheet } from "react-native";
import { OverlayLeft, OverlayRight } from "./components/Overlays";

const Counter = lazy(() =>
  import("./components/Counter").then((module) => ({ default: module.Counter })),
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  buttonsContainer: {
    position: "absolute",
    zIndex: 100,
    bottom: 65,
    left: 0,
    right: 0,
  },
  endComponentWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  counterContainer: {
    position: "absolute",
    bottom: 6,
    zIndex: 3 * 4,
    width: "90%",
  },
  swiper: {
    flex: 1,
  },
});

type CardSwiperProps<T extends ItemBase> = Pick<SwiperProps<T>, "items" | "initialDecisions"> & {
  onDecisionsChange?: (_: Decision[]) => void;
  labelsKeep?: string;
  labelsDrop?: string;
};

export function CardSwiper<T extends ItemBase>({
  items,
  initialDecisions = [],
  onDecisionsChange,
  labelsKeep,
  labelsDrop,
}: CardSwiperProps<T>) {
  const swiperRef = useRef<SwiperRefProps>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);
  const [currentIndex, setCurrentIndex] = useState(initialDecisions.length);
  const decisionsRef = useRef(decisions);

  const handleSwipe = useCallback(
    (newSwipe: Swipe) => {
      setDecisions((previousState) => {
        const newState =
          newSwipe.direction === null
            ? previousState.filter((swipe) => swipe.id !== newSwipe.id)
            : [...previousState, newSwipe as Decision];
        decisionsRef.current = newState;
        if (onDecisionsChange) {
          onDecisionsChange(decisionsRef.current);
        }
        return newState;
      });
    },
    [onDecisionsChange],
  );

  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    decisionsRef.current = decisions;
  }, [decisions]);

  useEffect(() => {
    setDecisions(initialDecisions);
  }, [initialDecisions]);

  function handleLayoutChange(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }

  return (
    <Box
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      fullWidth
      onLayout={handleLayoutChange}
      style={styles.container}
    >
      {size && (
        <Swiper
          height={size.height}
          initialDecisions={initialDecisions}
          initialIndex={initialDecisions.length}
          items={items}
          onIndexChange={handleIndexChange}
          onSwipe={handleSwipe}
          overlayLeft={<OverlayLeft label={labelsDrop} />}
          overlayRight={<OverlayRight label={labelsKeep} />}
          ref={swiperRef}
          renderItem={({ id }) => <AssetImage id={id} width={size.width} height={size.height} />}
          style={styles.swiper}
          width={size.width}
        />
      )}

      <Box
        style={styles.buttonsContainer}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <ButtonCircleIcon
          type="drop"
          onPress={() => swiperRef.current?.swipeLeft()}
          disabled={currentIndex > items.length - 1}
          size={58}
          animationDirection="left"
        />
        <ButtonCircleIcon
          onPress={() => swiperRef.current?.swipeBack()}
          type="undo"
          disabled={currentIndex === 0}
          animationDirection="down"
          size={48}
        />
        <ButtonCircleIcon
          onPress={() => swiperRef.current?.swipeRight()}
          type="keep"
          disabled={currentIndex > items.length - 1}
          size={58}
          animationDirection="right"
        />
      </Box>

      <Counter
        style={styles.counterContainer}
        currentItem={Math.min(currentIndex, items.length) + 1}
        totalItems={items.length}
      />
    </Box>
  );
}
