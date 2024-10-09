import { ScreenContainer } from "@components/ScreenContainer";
import { type Decision, type Direction } from "@components/Swiper";
import { Typography } from "@components/Typography";
import { type TypedScope, useT } from "@contexts/i18n";
import { useGoToGroupReview } from "@navigation/helpers";
import { type AppStackParams, Routes } from "@navigation/routes";
import { type RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { type Choice, useMonthAssets, useUpdateFlatAssets } from "@utils/stores/assets";
import React, { Suspense, lazy, useCallback, useLayoutEffect, useRef, useState } from "react";
import { convertChoiceToDirection, convertDirectionToChoice } from "./utils";

const CardSwiper = lazy(() =>
  import("./CardSwiper").then((module) => ({ default: module.CardSwiper })),
);

type GroupRouteProp = RouteProp<AppStackParams, Routes.Group>;

export function Group() {
  const t = useT();
  const route = useRoute<GroupRouteProp>();
  const { year, month } = route.params;
  const assets = useMonthAssets(year, month);
  const updateAssets = useUpdateFlatAssets();
  const [focus, setFocus] = useState(false);

  const gotoGroupReview = useGoToGroupReview();
  const initialDecisions = assets
    .filter(({ choice }) => typeof choice !== "undefined")
    .map(({ id, choice }) => ({
      id,
      direction: convertChoiceToDirection(choice as Choice) as Direction,
    }));
  const decisionsRef = useRef<Decision[]>(initialDecisions);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${t(`date.months.${month.toString()}` as TypedScope)} ${year}`,
      gestureResponseDistance: 25,
    });
  }, [navigation, month, year, t]);

  const updateAssetChoices = useCallback(() => {
    const updatedAssets = assets.map((asset) => {
      const decision = decisionsRef.current.find((d) => d.id === asset.id);
      if (!decision) {
        return { ...asset, choice: undefined };
      }
      const choice = convertDirectionToChoice(decision.direction);
      switch (choice) {
        case "drop":
        case "keep":
          return { ...asset, choice };
        default: {
          const { choice: _, ...assetWithoutChoice } = asset;
          return assetWithoutChoice;
        }
      }
    });
    updateAssets(updatedAssets);
  }, [assets, updateAssets]);

  useFocusEffect(
    useCallback(() => {
      setFocus(true);
      return () => {
        updateAssetChoices();
        setFocus(false);
      };
    }, [updateAssetChoices]),
  );

  function checkDecisionsAndUpdate() {
    const allAssetsHaveDecisions = assets.every((asset) =>
      decisionsRef.current.some((d) => d.id === asset.id),
    );

    if (allAssetsHaveDecisions) {
      updateAssetChoices();
      gotoGroupReview({ year, month }, true);
    }
  }

  function handleDecisionsChanged(decisions: Decision[]) {
    decisionsRef.current = decisions;
    checkDecisionsAndUpdate();
  }

  return (
    <ScreenContainer preset="full">
      {focus && (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <CardSwiper
            items={assets.map(({ id }) => ({ id }))}
            onDecisionsChange={handleDecisionsChanged}
            initialDecisions={initialDecisions}
            labelsKeep={t("screens.group.swiper.keep")}
            labelsDrop={t("screens.group.swiper.drop")}
          />
        </Suspense>
      )}
    </ScreenContainer>
  );
}
