import { ListEntryGeneric } from "@components/ListEntryGeneric";
import { Typography } from "@components/Typography";
import { useT } from "@contexts/i18n";
import { useResetAssets } from "@utils/stores/assets";
import React from "react";
import { Alert } from "react-native";

export function ListEntryResetAppData() {
  const t = useT();
  const resetAssets = useResetAssets();

  function resetAppData() {
    resetAssets();
  }

  const confirmClearDataAction = () =>
    Alert.alert(
      t("screens.settings.entries.resetAppData.confirm.title"),
      t("screens.settings.entries.resetAppData.confirm.message"),
      [
        {
          text: t("screens.settings.entries.resetAppData.confirm.cancelLabel"),
          style: "cancel",
        },
        { text: "OK", onPress: () => resetAppData() },
      ],
    );

  return (
    <ListEntryGeneric onPress={confirmClearDataAction}>
      <Typography variant="list" palette="danger">
        {t("screens.settings.entries.resetAppData.label")}
      </Typography>
    </ListEntryGeneric>
  );
}
