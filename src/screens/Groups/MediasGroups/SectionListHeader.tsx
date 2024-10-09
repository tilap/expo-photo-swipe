import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleSheet } from "react-native";

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.darkMode ? "#333" : "#ddd",
      borderTopStartRadius: theme.rounded.base,
      borderTopEndRadius: theme.rounded.base,
    },
    text: {
      // color: theme.palette.primary,
    },
  });

// TODO: design
export const SectionListHeader = React.memo(function YearHeader({ label }: { label: string }) {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  return (
    <Box px={3} py={2} fullWidth style={themedStyles.container}>
      <Typography variant="h2" style={themedStyles.text}>
        {label}
      </Typography>
    </Box>
  );
});
