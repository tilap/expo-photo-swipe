import { Box } from "@components/Box";
import { Button } from "@components/Button";
import { ExtendedPressable } from "@components/ExtendedPressable";
import { RadioOffIcon, RadioOnIcon } from "@components/Icon";
import { Paper } from "@components/Paper";
import { Typography } from "@components/Typography";
import { Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { Modal, StyleSheet } from "react-native";

const styles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.overlays.base.backgroundColor,
    },
    paper: {
      padding: theme.spacings.xl,
      maxWidth: 300,
    },
    optionContainer: {
      marginBottom: theme.spacings.xl,
    },
    optionIcon: {
      color: theme.palette.primary,
    },
    optionButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: theme.spacings.lg,
    },
  });

type FilterOptions = {
  sortByDate: "asc" | "desc";
  showFilteredAlbums: boolean;
};

type Translations = {
  title: string;
  sortByDateNewFirst: string;
  sortByDateOldFirst: string;
  showFilteredAlbums: string;
  hideFilteredAlbums: string;
  close: string;
};

type FilterMenuProps = {
  isVisible: boolean;
  onClose: () => void;
  options: FilterOptions;
  onFilterChange: (newOptions: Partial<FilterOptions>) => void;
  translations: Translations;
};

export function FilterMenu({
  isVisible,
  onClose,
  options,
  onFilterChange,
  translations,
}: FilterMenuProps) {
  const themedStyles = useThemedStyles<typeof styles>(styles);

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <Box style={themedStyles.overlay}>
        <Paper shadow="high" style={themedStyles.paper}>
          <Typography variant="h2" mb={4}>
            {translations.title}
          </Typography>
          <Box style={themedStyles.optionContainer}>
            <ExtendedPressable
              onPress={() => onFilterChange({ sortByDate: "desc" })}
              style={themedStyles.optionButton}
            >
              <Typography>{translations.sortByDateNewFirst}</Typography>
              {options.sortByDate === "desc" ? (
                <RadioOnIcon size={20} style={themedStyles.optionIcon} />
              ) : (
                <RadioOffIcon size={20} style={themedStyles.optionIcon} />
              )}
            </ExtendedPressable>

            <ExtendedPressable
              onPress={() => onFilterChange({ sortByDate: "asc" })}
              style={themedStyles.optionButton}
            >
              <Typography>{translations.sortByDateOldFirst}</Typography>
              {options.sortByDate === "asc" ? (
                <RadioOnIcon size={20} style={themedStyles.optionIcon} />
              ) : (
                <RadioOffIcon size={20} style={themedStyles.optionIcon} />
              )}
            </ExtendedPressable>
          </Box>

          <Box style={themedStyles.optionContainer}>
            <ExtendedPressable
              onPress={() => onFilterChange({ showFilteredAlbums: false })}
              style={themedStyles.optionButton}
            >
              <Typography>{translations.showFilteredAlbums}</Typography>
              {!options.showFilteredAlbums ? (
                <RadioOnIcon size={20} style={themedStyles.optionIcon} />
              ) : (
                <RadioOffIcon size={20} style={themedStyles.optionIcon} />
              )}
            </ExtendedPressable>

            <ExtendedPressable
              onPress={() => onFilterChange({ showFilteredAlbums: true })}
              style={themedStyles.optionButton}
            >
              <Typography>{translations.hideFilteredAlbums}</Typography>
              {options.showFilteredAlbums ? (
                <RadioOnIcon size={20} style={themedStyles.optionIcon} />
              ) : (
                <RadioOffIcon size={20} style={themedStyles.optionIcon} />
              )}
            </ExtendedPressable>
          </Box>

          <Button onPress={onClose} text={translations.close} scheme="primary" />
        </Paper>
      </Box>
    </Modal>
  );
}
