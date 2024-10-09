// @source https://app.lottiefiles.com/animation/e7f6a28e-5980-43ee-92e5-c1c5b4f9181a
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { useT } from "@contexts/i18n";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  tada: {
    display: "flex",
    position: "absolute",
    zIndex: -1,
  },
});

const animationSizeFactor = 1.3;

export function Empty({ count }: { count: number }) {
  const t = useT();
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const opacityButtonAnim = useRef(new Animated.Value(0)).current;
  function handleLayoutChange(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        delay: 250,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        delay: 250,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityButtonAnim, {
        toValue: 1,
        delay: 750,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim, opacityButtonAnim]);

  return (
    <Box
      flex={1}
      fullWidth
      style={styles.container}
      alignItems="center"
      justifyContent="center"
      onLayout={handleLayoutChange}
    >
      <LottieView
        autoPlay
        loop={false}
        speed={1.6}
        style={[
          styles.tada,
          size && {
            width: animationSizeFactor * size.width,
            height: animationSizeFactor * size.height,
            left: (size.width - animationSizeFactor * size.width) / 2,
            top: (size.height - animationSizeFactor * size.height) / 2,
          },
        ]}
        source={require("@assets/lottie/tada.json")}
      />
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <Box mb={12} justifyContent="center" alignItems="center">
          <Typography variant="h1" mb={4}>
            {t("screens.groups.empty.title")}
          </Typography>
          <Typography variant="h3" align="center">
            {t("screens.groups.empty.text", { count })}
          </Typography>
        </Box>
      </Animated.View>
    </Box>
  );
}
