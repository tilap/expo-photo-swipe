import { Theme, useTheme, useThemedStyles } from "@contexts/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const styles = (_: Theme) =>
  StyleSheet.create({
    lineContainer: {
      position: "relative",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
  });

type Quotient = {
  value: number;
  color?: string;
};

type PercentageLineProps = {
  quotients: Quotient[];
  total: number;
  height: number;
  backgroundColor?: string;
};

export function PercentageLine({ quotients, total, height, backgroundColor }: PercentageLineProps) {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const widthAnims = useRef(quotients.map(() => new Animated.Value(0))).current;
  const theme = useTheme();

  useEffect(() => {
    quotients.forEach((quotient, index) => {
      const widthPercentage = (quotient.value / total) * 100;
      Animated.timing(widthAnims[index], {
        toValue: widthPercentage,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [quotients, total, widthAnims]);

  return (
    <Animated.View
      style={[
        themedStyles.lineContainer,
        { height },
        { backgroundColor: backgroundColor || theme.components.PercentageLine.backgroundColor },
      ]}
    >
      {quotients.map((quotient, index) => (
        <Animated.View
          key={index}
          style={[
            {
              height,
              backgroundColor:
                quotient.color || theme.components.PercentageLine.line.backgroundColor,
              width: widthAnims[index].interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}
