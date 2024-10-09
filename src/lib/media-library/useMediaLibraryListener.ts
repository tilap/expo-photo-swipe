import * as MediaLibrary from "expo-media-library";
import { type Asset, type MediaLibraryAssetsChangeEvent } from "expo-media-library";
import { useEffect } from "react";

type Callback = (assets: Asset[]) => void;

// TODO: use it to update library
export const useMediaLibraryListener = ({
  onAdded,
  onUpdated,
  onDeleted,
}: {
  onAdded?: Callback;
  onUpdated?: Callback;
  onDeleted?: Callback;
}) => {
  useEffect(() => {
    const subscription = MediaLibrary.addListener((event: MediaLibraryAssetsChangeEvent) => {
      if (event.hasIncrementalChanges) {
        if (event.insertedAssets && onAdded) {
          onAdded(event.insertedAssets);
        }
        if (event.updatedAssets && onUpdated) {
          onUpdated(event.updatedAssets);
        }
        if (event.deletedAssets && onDeleted) {
          onDeleted(event.deletedAssets);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onAdded, onUpdated, onDeleted]);
};
