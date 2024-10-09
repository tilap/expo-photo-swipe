import { ActivityIndicator } from "@components/ActivityIndicator";
import { Box } from "@components/Box";
import React from "react";

export const Loading = React.memo(function Empty() {
  return (
    <Box fullWidth flex={1} justifyContent="center">
      <ActivityIndicator size="large" />
    </Box>
  );
});
