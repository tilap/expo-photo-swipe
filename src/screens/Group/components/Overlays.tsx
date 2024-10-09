import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { type Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleSheet } from "react-native";

// TODO improve and bind it to the theme
const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    shared: {
      overflow: "hidden",
      borderRadius: 8,
      fontSize: 28,
      padding: 8,
      // TODO: fix. pb: using fontFamily does not seem long term viable
      fontFamily: "Bold",
    },
    right: {
      backgroundColor: theme.palette.keep,
      color: theme.palette.keepContrast,
      transform: [{ rotate: "-22deg" }],
    },
    left: {
      backgroundColor: theme.palette.drop,
      color: theme.palette.dropContrast,
      transform: [{ rotate: "22deg" }],
    },
  });

export function OverlayLeft({ label }: { label?: string }) {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  if (!label) return null;
  return (
    <Box style={[themedStyles.container]}>
      <Box justifyContent="center" alignItems="flex-end" px={6} py={10}>
        <Typography style={[themedStyles.shared, themedStyles.left]}>{label}</Typography>
      </Box>
    </Box>
  );
}

export function OverlayRight({ label }: { label?: string }) {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  if (!label) return null;
  return (
    <Box style={[themedStyles.container]}>
      <Box justifyContent="center" alignItems="flex-start" px={6} py={10}>
        <Typography style={[themedStyles.shared, themedStyles.right]}>{label}</Typography>
      </Box>
    </Box>
  );
}
