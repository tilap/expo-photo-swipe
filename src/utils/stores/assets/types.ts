import { type Asset } from "expo-media-library";

export { type Asset } from "expo-media-library";

export type Choice = "keep" | "drop";
export type Stats = Record<Choice | "unknown" | "total", number>;

export type SimpleAsset = Pick<Asset, "id" | "creationTime"> & { choice?: Choice };

export type AssetsState = {
  initialized: boolean;
  assets: Record<number, Record<number, SimpleAsset[]>>;
  lastSynchronization: number | null;
  syncing: boolean;
};

export type AssetsActions = {
  setInitialized: () => void;
  startSynchronization: () => Promise<void>;
  updateFlatAssets: (_: SimpleAsset[]) => void;
  deleteAssets: (_: string[]) => void;
  reset: () => void;
};

export type AssetsStore = AssetsState & AssetsActions;
