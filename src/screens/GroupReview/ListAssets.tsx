import { SimpleAsset } from "@utils/stores/assets/types";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { ListAssetsItem } from "./ListAssetsItem";

export type ListAssetsProps = {
  assets: SimpleAsset[];
  numColumns?: number;
  onChoiceToggle?: (id: string) => void;
  placeholderOnly?: boolean;
};

export function ListAssets({
  assets,
  numColumns = 3,
  onChoiceToggle,
  placeholderOnly,
}: ListAssetsProps) {
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const renderItem = React.useCallback(
    ({ item }: { item: SimpleAsset }) => (
      <ListAssetsItem
        item={item}
        onChoiceToggle={onChoiceToggle}
        itemSize={containerWidth ? Math.floor(containerWidth / numColumns) : 1}
        placeholderOnly={placeholderOnly}
      />
    ),
    [containerWidth, numColumns, onChoiceToggle, placeholderOnly],
  );

  const keyExtractor = React.useCallback((item: SimpleAsset) => item.id, []);

  return (
    <FlatList
      key={`grid-${numColumns}`}
      data={assets}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
      windowSize={15 * 5}
      initialNumToRender={15}
      removeClippedSubviews={true}
      getItemLayout={(_data, index) => ({
        length: containerWidth ? Math.floor(containerWidth / numColumns) : 1,
        offset: (containerWidth ? Math.floor(containerWidth / numColumns) : 1) * index,
        index,
      })}
    />
  );
}
