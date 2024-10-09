import * as MediaLibrary from "expo-media-library";

export async function deleteAssetsByIds(assetIds: string[]): Promise<void> {
  try {
    await MediaLibrary.deleteAssetsAsync(assetIds);
  } catch (error) {
    console.error("Error deleting assets:", error);
  }
}
