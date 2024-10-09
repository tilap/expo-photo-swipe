import { Box } from "@components/Box";
import { Button } from "@components/Button";
import { ScreenContainer } from "@components/ScreenContainer";
import { useT } from "@contexts/i18n";
import { deleteAssetsByIds } from "@lib/media-library/deleteAssetsByIds";
import { useGoToGroups } from "@navigation/helpers";
import { type AppStackParams, Routes } from "@navigation/routes";
import { type RouteProp, useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Choice, useMonthAssets, useUpdateFlatAssets } from "@utils/stores/assets";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ListAssets } from "./ListAssets";

type GroupRouteProp = RouteProp<AppStackParams, Routes.Group>;

const animationDuration = 300; // Example duration in milliseconds

export function GroupReview() {
  const route = useRoute<GroupRouteProp>();
  const { year, month } = route.params;
  const assets = useMonthAssets(year, month);
  const updateAssets = useUpdateFlatAssets();
  const t = useT();
  const gotoGroups = useGoToGroups();
  const localAssets = useMemo(() => assets, [assets]);
  const [currentAssets, setCurrentAssets] = useState(localAssets);
  const localAssetsRef = useRef(currentAssets);
  const [animationFinished, setAnimationFinished] = useState(false);

  const handleChoiceToggle = useCallback((id: string) => {
    setCurrentAssets((prevAssets) => {
      const updatedAssets = prevAssets.map((asset) =>
        asset.id === id
          ? { ...asset, choice: asset.choice === "keep" ? "drop" : ("keep" as Choice) }
          : asset,
      );
      localAssetsRef.current = updatedAssets;
      return updatedAssets;
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      setAnimationFinished(false); // Reset the flag when the screen is focused

      // Simulate animation duration
      const timer = setTimeout(() => {
        setAnimationFinished(true); // Set the flag to true after animation
      }, animationDuration);

      return () => {
        clearTimeout(timer);
        updateAssets(localAssetsRef.current);
      };
    }, [updateAssets]),
  );

  const itemsToDelete = useMemo(() => {
    return currentAssets.filter((asset) => asset.choice === "drop");
  }, [currentAssets]);

  const handleButtonPress = useCallback(() => {
    Promise.resolve()
      .then(() => {
        if (itemsToDelete.length > 0) {
          return deleteAssetsByIds(itemsToDelete.map(({ id }) => id));
        }
      })
      .finally(() => {
        gotoGroups();
      });
  }, [gotoGroups, itemsToDelete]);

  return (
    <ScreenContainer>
      <ListAssets
        assets={currentAssets}
        onChoiceToggle={handleChoiceToggle}
        numColumns={3}
        placeholderOnly={!animationFinished}
      />
      <Box px={4} pt={4} pb={2} fullWidth>
        <Button
          text={
            animationFinished
              ? t("screens.groupReview.button", { count: itemsToDelete.length })
              : ""
          }
          onPress={handleButtonPress}
          scheme={itemsToDelete.length > 0 ? "danger" : "primary"}
          disabled={!animationFinished}
        />
      </Box>
    </ScreenContainer>
  );
}
