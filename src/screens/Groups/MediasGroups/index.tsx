import { Box } from "@components/Box";
import { RefreshControl } from "@components/RefreshControl";
import { Theme, useThemedStyles } from "@contexts/theme";
import { useAssetsSynchronization, useCount, useTreeWithAssetCount } from "@utils/stores/assets";
import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { SectionList, StyleSheet } from "react-native";
import { Loading } from "./Loading";
import { SectionListHeader } from "./SectionListHeader";
import { SectionListItem } from "./SectionListItem";

const Empty = lazy(() => import("./Empty").then((module) => ({ default: module.Empty })));

const styles = (theme: Theme) =>
  StyleSheet.create({
    containerSyncing: {},
    sectionList: {
      width: "100%",
      borderTopLeftRadius: theme.rounded.base,
      borderTopRightRadius: theme.rounded.base,
      overflow: "hidden",
    },
  });

export function MediasGroups({
  sort,
  filterGroups,
}: {
  sort?: "asc" | "desc";
  filterGroups: boolean;
}) {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const { syncing, startSynchronization } = useAssetsSynchronization();
  const [refreshing, setRefreshing] = useState(false);
  const count = useCount();
  // Refreshing local state
  const handleOnRefresh = useCallback(() => {
    if (!refreshing && !syncing) {
      setRefreshing(true);
      startSynchronization();
    }
  }, [refreshing, startSynchronization, syncing]);
  useEffect(() => {
    if (!syncing && refreshing) {
      setRefreshing(false);
    }
  }, [refreshing, syncing]);

  const assetsTree = useTreeWithAssetCount(filterGroups);

  const sortFactor = sort === "asc" ? 1 : -1;

  const sections = useMemo(() => {
    return Object.entries(assetsTree)
      .sort(([a], [b]) => sortFactor * (Number(a) - Number(b)))
      .map(([year, months]) => ({
        title: year.toString(),
        data: Object.entries(months)
          .sort(([monthA], [monthB]) => sortFactor * (Number(monthA) - Number(monthB)))
          .map(([month, _count]) => ({ year: Number(year), month: Number(month) })),
      }));
  }, [assetsTree, sortFactor]);

  if (Object.entries(assetsTree).length === 0) {
    if (syncing) {
      return <Loading />;
    }
    // If no album because they have all been clean, display tada animation
    return <Empty count={count} />;
  }

  return (
    <Box style={[syncing && themedStyles.containerSyncing]} fullWidth flex={1}>
      <SectionList
        // PERF: depend on screen size for an approx good optimization
        initialNumToRender={8}
        // PERF: maybe
        getItemLayout={undefined}
        sections={sections}
        keyExtractor={(item) => `${item.year}-${item.month}`}
        renderSectionHeader={({ section: { title } }) => <SectionListHeader label={title} />}
        renderItem={({ item }) => (
          <SectionListItem year={item.year} month={item.month} disabled={false} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />}
        style={themedStyles.sectionList}
      />
    </Box>
  );
}
