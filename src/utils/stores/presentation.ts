import config from "@config";
import { createAsyncPersistStorage } from "@lib/zustand/createAsyncPersistStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PresentationState = {
  sortByDate: "desc" | "asc";
  showFilteredAlbums: boolean;
  initialized: boolean;
};

type PresentationActions = {
  setSortByDate: (order: "desc" | "asc") => void;
  setShowFilteredAlbums: (show: boolean) => void;
  setInitialized: () => void;
};

const storage = createAsyncPersistStorage<PresentationState>();

const initialState: PresentationState = {
  initialized: false,
  sortByDate: "desc",
  showFilteredAlbums: true,
};

export const usePresentationStore = create<PresentationState & PresentationActions>()(
  persist(
    (set) => ({
      ...initialState,
      setInitialized: () => set({ initialized: true }),
      setSortByDate: (order: "desc" | "asc") => set({ sortByDate: order }),
      setShowFilteredAlbums: (show: boolean) => set({ showFilteredAlbums: show }),
    }),
    {
      name: config.stores.preferences.name,
      storage,
      onRehydrateStorage: (state) => {
        return (newState) => {
          if (state && newState) {
            newState.setInitialized();
          }
          return newState;
        };
      },
      partialize: ({ sortByDate, showFilteredAlbums }) => ({
        sortByDate,
        showFilteredAlbums,
      }),
    },
  ),
);
