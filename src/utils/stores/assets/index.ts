import config from "@config";
import { fetchAllAssets } from "@lib/media-library/fetchAllAssets";
import { createAsyncPersistStorage } from "@lib/zustand/createAsyncPersistStorage";
import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Asset, type AssetsState, type AssetsStore, SimpleAsset, Stats } from "./types";

export { type Choice } from "./types";

const storage = createAsyncPersistStorage<AssetsState>();

function convertAssetToSimpleAsset(asset: Asset): SimpleAsset {
  const { id, creationTime } = asset;
  return { id, creationTime };
}

const defaultState = {
  assets: {},
  initialized: false,
  lastSynchronization: null,
  syncing: false,
};
export const useAssetsStore = create<AssetsStore>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setInitialized: () => set({ initialized: true }),
      startSynchronization: async () => {
        if (get().syncing) {
          return;
        }

        try {
          set({ syncing: true });
          const currentAssets = get().assets;
          const allAssets = await fetchAllAssets();
          const assets: AssetsState["assets"] = {};
          allAssets.forEach((asset) => {
            const year = new Date(asset.creationTime).getFullYear();
            const month = new Date(asset.creationTime).getMonth() + 1;
            const simpleAsset = convertAssetToSimpleAsset(asset);
            const existingAsset = currentAssets[year]?.[month]?.find(
              (currentAsset) => currentAsset.id === simpleAsset.id,
            );

            if (existingAsset) {
              simpleAsset.choice = existingAsset.choice;
            }
            if (!assets[year]) {
              assets[year] = {};
            }
            if (!assets[year][month]) {
              assets[year][month] = [];
            }
            assets[year][month].push(simpleAsset);
          });
          set({ syncing: false, assets, lastSynchronization: Date.now() });
          return;
        } catch (error) {
          console.error("Error fetching media:", error);
        } finally {
          set({ syncing: false });
        }
      },
      updateFlatAssets: (flatAssets) => {
        set(({ assets }) => {
          const updatedAssets = { ...assets };
          flatAssets.forEach((asset) => {
            const year = new Date(asset.creationTime).getFullYear();
            const month = new Date(asset.creationTime).getMonth() + 1;
            const existingIndex = updatedAssets[year]?.[month]?.findIndex(
              (previousAsset) => previousAsset.id === asset.id,
            );
            if (existingIndex > -1) {
              updatedAssets[year][month][existingIndex] = asset;
            } else {
              console.error("Try to update an asset that dont exists", asset);
            }
          });
          return { assets: updatedAssets };
        });
      },
      reset: () => set(defaultState),
      deleteAssets: (assetIds: string[]) => {
        set(({ assets }) => {
          const updatedAssets = { ...assets };
          assetIds.forEach((id) => {
            for (const year in updatedAssets) {
              for (const month in updatedAssets[year]) {
                updatedAssets[year][month] = updatedAssets[year][month].filter(
                  (asset) => asset.id !== id,
                );
              }
            }
          });
          return { assets: updatedAssets };
        });
      },
    }),
    {
      name: config.stores.assets.name,
      storage,
      onRehydrateStorage: (state) => {
        return (newState) => {
          if (state && newState) {
            newState.setInitialized();
          }
          return newState;
        };
      },
      partialize: (state) => ({
        assets: state.assets,
        lastSynchronization: state.lastSynchronization,
      }),
    },
  ),
);

const useAssets = () => useAssetsStore((state) => state.assets);

export const useUpdateFlatAssets = () => useAssetsStore((state) => state.updateFlatAssets);

export const useAssetsSynchronization = () => {
  const syncing = useAssetsStore((state) => state.syncing);
  const lastSynchronization = useAssetsStore((state) => state.lastSynchronization);
  const startSynchronization = useAssetsStore((state) => state.startSynchronization);

  return useMemo(
    () => ({ syncing, startSynchronization, lastSynchronization }),
    [syncing, startSynchronization, lastSynchronization],
  );
};

type AssetsTree = Record<number, Record<number, number>>;

export function useTreeWithAssetCount(excludeKeep: boolean = false): AssetsTree {
  const assets = useAssetsStore.getState().assets;

  const sortedTree: AssetsTree = Object.keys(assets)
    .map(Number)
    .reduce((acc, year) => {
      const months = Object.keys(assets[year])
        .map(Number)
        .reduce(
          (monthAcc, month) => {
            if (assets[year][month].length > 0) {
              const allKeep = assets[year][month].every((asset) => asset.choice === "keep");
              if (excludeKeep && allKeep) {
                return monthAcc; // Skip this month if all assets are marked as keep
              }
              monthAcc[month] = assets[year][month].length;
            }
            return monthAcc;
          },
          {} as Record<number, number>,
        );

      if (Object.keys(months).length > 0) {
        acc[year] = months;
      }
      return acc;
    }, {} as AssetsTree);
  return sortedTree;
}

export function useYearsWithAssets() {
  const assets = useAssets();
  return Object.keys(assets).map(Number);
}

/**
 * Get assets for a specific month and year, sorted by creation time.
 *
 * @param {number} year - The year of the assets.
 * @param {number} month - The month of the assets.
 * @param {"asc" | "desc"} [order="asc"] - The order to sort the assets by creation time.
 * @returns {SimpleAsset[]} - The sorted assets for the specified month and year.
 */
export function useMonthAssets(
  year: number,
  month: number,
  order: "asc" | "desc" = "asc",
): SimpleAsset[] {
  const assets = useAssets();
  const sortFactor = order === "asc" ? 1 : -1;
  if (!assets[year] || !assets[year][month]) {
    return [];
  }
  return assets[year][month].sort((a, b) => sortFactor * (a.creationTime - b.creationTime));
}

export function useMonthCover(year: number, month: number): SimpleAsset | undefined {
  const assets = useMonthAssets(year, month);
  return assets.find((asset) => !asset.choice);
}

export function useMonthFirstAsset(year: number, month: number): SimpleAsset | undefined {
  const assets = useMonthAssets(year, month);
  return assets[0];
}

export function useCount(): number {
  const assets = useAssets();
  return Object.values(assets).reduce((yearAcc, months) => {
    return (
      yearAcc +
      Object.values(months).reduce((monthAcc, assetsArray) => {
        return monthAcc + assetsArray.length;
      }, 0)
    );
  }, 0);
}

export function useDecisionsStats(): Stats {
  const stats: Stats = { keep: 0, drop: 0, unknown: 0, total: 0 };
  const assets = useAssets();
  Object.values(assets).forEach((yearDecisions) => {
    Object.values(yearDecisions).forEach((monthDecisions) => {
      monthDecisions.forEach(({ choice }) => {
        stats[choice || "unknown"]++;
      });
    });
  });

  return { ...stats, total: stats.keep + stats.drop + stats.unknown };
}

export function useMonthDecisionsStats(year: number, month: number): Stats {
  const stats: Stats = { keep: 0, drop: 0, unknown: 0, total: 0 };
  const assets = useMonthAssets(year, month);
  Object.values(assets).forEach(({ choice }) => stats[choice || "unknown"]++);
  return { ...stats, total: stats.keep + stats.drop + stats.unknown };
}

export const useResetAssets = () => useAssetsStore((state) => state.reset);

export const useDeleteAssets = () => useAssetsStore((state) => state.deleteAssets);
