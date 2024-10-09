import { type Asset, type MediaTypeValue, getAssetsAsync } from "expo-media-library";

type Options = {
  mediaType?: MediaTypeValue | MediaTypeValue[];
  batchSize?: number;
};

export async function fetchAllAssets({ mediaType = "photo", batchSize = 5_000 }: Options = {}) {
  const allAssets: Asset[] = [];
  let hasMoreAssets = true;
  let after;

  while (hasMoreAssets) {
    const { assets, hasNextPage } = await getAssetsAsync({
      mediaType,
      first: batchSize,
      after,
    });
    allAssets.push(...assets);

    if (assets.length > 0) {
      after = assets[assets.length - 1].id;
    }
    hasMoreAssets = hasNextPage;
  }

  return allAssets;
}
