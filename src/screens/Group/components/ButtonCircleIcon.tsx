import { ExtendedPressable, type ExtendedPressableProps } from "@components/ExtendedPressable";
import { DropIcon, KeepIcon, UndoIcon } from "@components/Icon";
import { type Theme, useThemedStyles } from "@contexts/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, StyleSheet, TextStyle } from "react-native";

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10000,
      overflow: "hidden",
    },
    keepContainer: {
      backgroundColor: theme.components.ButtonCircleIcon.keep.backgroundColor,
    },
    dropContainer: {
      backgroundColor: theme.components.ButtonCircleIcon.drop.backgroundColor,
    },
    undoContainer: {
      backgroundColor: theme.components.ButtonCircleIcon.undo.backgroundColor,
    },
    icon: {
      shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 15,
    },
    keepIcon: {
      color: theme.components.ButtonCircleIcon.keep.color,
    },
    dropIcon: {
      color: theme.components.ButtonCircleIcon.keep.color,
    },
    undoIcon: {
      color: theme.components.ButtonCircleIcon.undo.color,
    },
  });

type IconType = "keep" | "drop" | "undo";

type AnimationDirection = "up" | "down" | "left" | "right";

type ButtonCircleIconProps = Omit<ExtendedPressableProps, "children"> & {
  type: IconType;
  size?: number;
  disabled?: boolean;
  animationDirection?: AnimationDirection;
  animationDuration?: number;
};

function Icon({
  size,
  type,
  style,
}: {
  size: number;
  type?: IconType;
  style?: StyleProp<TextStyle>;
}) {
  switch (type) {
    case "keep":
      return <KeepIcon size={Math.floor(size * 0.6)} style={style} />;
    case "drop":
      return <DropIcon size={Math.floor(size * 0.7)} style={style} />;
    case "undo":
      return <UndoIcon size={Math.floor(size * 0.6)} style={style} />;
  }
}

export function ButtonCircleIcon({
  type = "undo",
  size = 60,
  disabled,
  animationDirection,
  animationDuration = 300,
  ...pressableProps
}: ButtonCircleIconProps) {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (disabled) {
      const animations = [
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ];
      if (animationDirection) {
        animations.push(
          Animated.timing(translateAnim, {
            toValue: 30,
            duration: animationDuration,
            useNativeDriver: true,
          }),
        );
      }
      Animated.parallel(animations).start();
    } else {
      const animations = [
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ];
      if (animationDirection) {
        animations.push(
          Animated.timing(translateAnim, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
          }),
        );
      }
      Animated.parallel(animations).start();
    }
  }, [disabled, fadeAnim, translateAnim, animationDirection, animationDuration]);

  const getTranslateStyle = () => {
    if (!animationDirection) return {};

    switch (animationDirection) {
      case "down":
        return { transform: [{ translateY: translateAnim }] };
      case "up":
        return {
          transform: [
            {
              translateY: translateAnim.interpolate({ inputRange: [0, 30], outputRange: [0, -30] }),
            },
          ],
        };
      case "right":
        return { transform: [{ translateX: translateAnim }] };
      case "left":
        return {
          transform: [
            {
              translateX: translateAnim.interpolate({ inputRange: [0, 30], outputRange: [0, -30] }),
            },
          ],
        };
      default:
        return {};
    }
  };

  return (
    <ExtendedPressable
      {...pressableProps}
      style={({ pressed }: { pressed: boolean }) => [pressed && { transform: [{ scale: 0.94 }] }]}
    >
      <Animated.View
        style={[
          themedStyles.container,
          themedStyles[`${type}Container`],
          { width: size, height: size, opacity: fadeAnim },
          getTranslateStyle(),
        ]}
      >
        <Icon type={type} size={size} style={[themedStyles.icon, themedStyles[`${type}Icon`]]} />
      </Animated.View>
    </ExtendedPressable>
  );
}
