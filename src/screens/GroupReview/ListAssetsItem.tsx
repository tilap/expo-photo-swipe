import { AssetImage } from "@components/AssetImage";
import { Box } from "@components/Box";
import { ExtendedPressable } from "@components/ExtendedPressable";
import { DropIcon, KeepIcon } from "@components/Icon";
import { Theme, useThemedStyles } from "@contexts/theme";
import { SimpleAsset } from "@utils/stores/assets/types";
import React from "react";
import { StyleSheet } from "react-native";

const styles = (theme: Theme, itemSize: number) => {
  const padding = 6;
  return StyleSheet.create({
    item: {
      position: "relative",
      alignItems: "center",
      display: "flex",
      width: itemSize,
      height: itemSize,
      padding: padding,
    },
    keepItem: {},
    dropItem: {},
    image: {
      width: itemSize - 2 * padding,
      height: itemSize - 2 * padding,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: theme.components.AssetImage.backgroundColor,
    },
    dropImage: {
      borderColor: theme.palette.drop,
    },
    keepImage: {},
    iconContainer: {
      position: "absolute",
      zIndex: 100,
      bottom: padding,
      right: padding,
      paddingRight: 2,
      paddingBottom: 2,
      paddingLeft: 3,
      paddingTop: 3,
      borderTopLeftRadius: theme.rounded.base,
    },
    keepIconContainer: {
      display: "none",
    },
    dropIconContainer: {
      backgroundColor: theme.palette.drop,
    },
    icon: {},
    keepIcon: {
      // color: theme.palette.keepContrast,
    },
    dropIcon: {
      color: theme.palette.dropContrast,
    },
  });
};

export type ListAssetsItemProps = {
  item: SimpleAsset;
  onChoiceToggle?: (id: string) => void;
  itemSize: number;
  placeholderOnly?: boolean;
};

export const ListAssetsItem = ({
  item,
  onChoiceToggle,
  itemSize,
  placeholderOnly,
}: ListAssetsItemProps) => {
  const themedStyles = useThemedStyles<typeof styles>(styles, itemSize);
  function handlePress() {
    onChoiceToggle && onChoiceToggle(item.id);
  }
  const { choice } = item;

  if (typeof choice === "undefined") {
    return;
  }

  const Icon = choice === "keep" ? KeepIcon : DropIcon;
  return (
    <ExtendedPressable
      onPress={handlePress}
      style={[themedStyles.item, themedStyles[`${choice}Item`]]}
    >
      {placeholderOnly ? (
        <Box style={themedStyles.image} />
      ) : (
        <AssetImage
          id={item.id}
          style={[themedStyles.image, themedStyles[`${choice}Image`]]}
          rounded="sm"
        />
      )}
      {!placeholderOnly && (
        <Box style={[themedStyles.iconContainer, themedStyles[`${choice}IconContainer`]]}>
          <Icon size={28} style={[themedStyles.icon, themedStyles[`${choice}Icon`]]} />
        </Box>
      )}
    </ExtendedPressable>
  );
};
