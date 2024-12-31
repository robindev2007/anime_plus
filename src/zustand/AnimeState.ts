import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WatchHistory = {
  animeId: number | string;
  lastWatchEpisode: number;
  preferredLanguage: string;
}[];

type Store = {
  watchHistory: WatchHistory;
  getHistoryByAnimeId: (
    animeId: number | string,
  ) => WatchHistory[0] | undefined;
  addWatchHistory: (newHistory: WatchHistory[0]) => void;
  updateWatchHistoryById: (
    animeId: number | string,
    updatedData: Partial<WatchHistory[0]>,
  ) => void;
};

export const useAnimeStore = create(
  persist<Store>(
    (set, get) => ({
      watchHistory: [],
      getHistoryByAnimeId(animeId) {
        return get().watchHistory.find((entry) => entry.animeId === animeId);
      },
      addWatchHistory(newHistory) {
        set((state) => {
          const existingHistory = state.watchHistory.find(
            (entry) => entry.animeId === newHistory.animeId,
          );

          if (existingHistory) {
            // If history exists, update it
            return {
              watchHistory: state.watchHistory.map((entry) =>
                entry.animeId === newHistory.animeId ? newHistory : entry,
              ),
            };
          } else {
            // If history doesn't exist, add it
            return { watchHistory: [...state.watchHistory, newHistory] };
          }
        });
      },
      updateWatchHistoryById(animeId, updatedData) {
        set((state) => ({
          watchHistory: state.watchHistory.map((entry) =>
            entry.animeId === animeId
              ? { ...entry, ...updatedData } // Merge updatedData with the existing entry
              : entry,
          ),
        }));
      },
    }),
    {
      name: "anime-watch-history", // Name of the item in the storage (unique)
      storage: createJSONStorage(() => localStorage), // Using sessionStorage
    },
  ),
);
