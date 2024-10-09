import { AssetImage } from "@components/AssetImage";
import { Box } from "@components/Box";
import { ExtendedPressable } from "@components/ExtendedPressable";
import { StartToEndIcon } from "@components/Icon";
import { PercentageLine } from "@components/PercentageLine";
import { Typography } from "@components/Typography";
import { TypedScope, useT } from "@contexts/i18n";
import { Theme, useTheme, useThemedStyles } from "@contexts/theme";
import { useGoToGroup, useGoToGroupReview } from "@navigation/helpers";
import { useMonthCover, useMonthDecisionsStats, useMonthFirstAsset } from "@utils/stores/assets";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

// Adjust asset size depending on screen size
const useImageSize = () => {
  const { width } = useWindowDimensions();
  return Math.min(90, width / 4); // Example logic to adjust size
};

const styles = (theme: Theme, imageSize: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.palette.surface,
    },
    containerAsset: {
      width: imageSize,
      height: imageSize,
    },
    percentage: {},
    icon: {
      color: theme.palette.subtle,
    },
  });

// TODO: design
export const SectionListItem = React.memo(function SectionListItem({
  year,
  month,
  disabled,
}: {
  year: number;
  month: number;
  disabled?: boolean;
}) {
  const theme = useTheme();
  const t = useT();
  const gotoGroup = useGoToGroup();
  const gotoGroupReview = useGoToGroupReview();
  const imageSize = useImageSize();
  const themedStyles = useThemedStyles<typeof styles>(styles, imageSize);
  const decisions = useMonthDecisionsStats(year, month);
  const cover = useMonthCover(year, month);
  const firstAsset = useMonthFirstAsset(year, month);

  const asset = cover || firstAsset;
  if (!decisions.total) {
    return null;
  }

  return (
    <ExtendedPressable
      disabled={disabled}
      onPress={() =>
        decisions.unknown === 0 ? gotoGroupReview({ year, month }) : gotoGroup(year, month)
      }
    >
      <Box style={themedStyles.container} py={3} px={3} flexDirection="row" fullWidth>
        <Box style={themedStyles.containerAsset}>
          {asset && <AssetImage id={asset.id} width={imageSize} height={imageSize} />}
        </Box>
        <Box flexDirection="column" flex={1} pl={4} pr={3}>
          <Typography variant="h3" mb={2}>
            {t(`date.months.${month}` as TypedScope)}
          </Typography>
          <Typography variant="list" palette="subtle" flex={1}>
            {`${decisions.keep + decisions.drop}/${decisions.total}`}
          </Typography>
          <Box mt={1} fullWidth>
            <PercentageLine
              quotients={[
                { value: decisions.keep, color: theme.palette.keep },
                { value: decisions.drop, color: theme.palette.drop },
              ]}
              total={decisions.total}
              height={8}
            />
          </Box>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <StartToEndIcon size={28} style={themedStyles.icon} />
        </Box>
      </Box>
    </ExtendedPressable>
  );
});
