import { ScreenContainer } from "@components/ScreenContainer";
import { useT } from "@contexts/i18n";
import { withMediaLibraryPermission } from "@lib/withMediaLibraryPermission";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAssetsSynchronization } from "@utils/stores/assets";
import { usePresentationStore } from "@utils/stores/presentation";
import React, { lazy, useLayoutEffect, useState } from "react";
import { FilterMenu } from "./components/FilterMenu";
import { NavbarHeadLeftFilter } from "./components/NavbarHeadLeftFilter";
import { MediasGroups } from "./MediasGroups";

type FilterOptions = {
  sortByDate: "asc" | "desc";
  showFilteredAlbums: boolean;
};

const PermissionRequired = lazy(() =>
  import("@screens/PermissionRequired/index").then((module) => ({
    default: module.PermissionRequiredScreen,
  })),
);

const GroupsContent = withMediaLibraryPermission(() => {
  const { startSynchronization } = useAssetsSynchronization();
  const [focus, setFocus] = useState(false);
  const navigation = useNavigation();
  const { sortByDate, showFilteredAlbums, setSortByDate, setShowFilteredAlbums } =
    usePresentationStore();
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const t = useT();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <NavbarHeadLeftFilter onPress={() => setShowFilterMenu(true)} />,
    });
  }, [navigation]);

  const handleFilterChange = (newOptions: Partial<FilterOptions>) => {
    if (newOptions.sortByDate) {
      setSortByDate(newOptions.sortByDate);
    }
    if (typeof newOptions.showFilteredAlbums === "boolean") {
      setShowFilteredAlbums(newOptions.showFilteredAlbums);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setFocus(true);
      startSynchronization();
      return () => {
        setFocus(false);
      };
    }, [startSynchronization]),
  );

  return (
    <ScreenContainer preset="full">
      {focus && (
        <>
          <MediasGroups sort={sortByDate} filterGroups={showFilteredAlbums} />
          <FilterMenu
            isVisible={showFilterMenu}
            onClose={() => setShowFilterMenu(false)}
            options={{ sortByDate, showFilteredAlbums }}
            onFilterChange={handleFilterChange}
            translations={{
              title: t("screens.groups.filterMenu.title"),
              sortByDateNewFirst: t("screens.groups.filterMenu.sortByDateNewFirst"),
              sortByDateOldFirst: t("screens.groups.filterMenu.sortByDateOldFirst"),
              showFilteredAlbums: t("screens.groups.filterMenu.showFilteredAlbums"),
              hideFilteredAlbums: t("screens.groups.filterMenu.hideFilteredAlbums"),
              close: t("screens.groups.filterMenu.close"),
            }}
          />
        </>
      )}
    </ScreenContainer>
  );
});

export function Groups() {
  return <GroupsContent fallback={<PermissionRequired type="mediaLibrary" />} />;
}
