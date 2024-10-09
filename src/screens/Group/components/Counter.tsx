import { Box } from "@components/Box";
import { PercentageLine } from "@components/PercentageLine";
import { Typography } from "@components/Typography";
import { Theme, useThemedStyles } from "@contexts/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    badge: {
      paddingHorizontal: 6,
      paddingVertical: 1,
      backgroundColor: theme.components.Counter.backgroundColor,
      borderRadius: theme.rounded.base,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: theme.components.Counter.textColor,
    },
  });

interface CounterProps {
  currentItem: number;
  totalItems: number;
  style?: ViewStyle;
  hidden?: boolean;
}

export function Counter({ currentItem, totalItems, style, hidden = false }: CounterProps) {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: hidden ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [hidden, opacity]);

  if (totalItems === 0) {
    return null;
  }

  return (
    <Animated.View style={[themedStyles.container, style, { opacity }]}>
      <Box style={themedStyles.badge}>
        <Typography palette="subtle" variant="annotation">
          {currentItem} / {totalItems}
        </Typography>
      </Box>
      <Box mt={1} fullWidth>
        <PercentageLine quotients={[{ value: currentItem }]} total={totalItems} height={8} />
      </Box>
    </Animated.View>
  );
}
