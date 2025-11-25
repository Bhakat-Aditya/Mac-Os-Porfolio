import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// 1. Define your wallpapers here with their specific extensions
const WALLPAPERS = [
    "/images/wal1.png", // The default one
    "/images/wal2.jpg",      // Change to .jpg if needed
    "/images/wal3.jpg",
    "/images/wal4.png",
    "/images/wal5.jpg",
    "/images/wal6.jpg",
    "/images/wal7.jpg",
    "/images/wal8.jpg",
    "/images/wal9.jpg",
    "/images/wal10.jpg",
    "/images/wal11.jpg",
    "/images/wal12.jpg",
    "/images/wal13.jpg",
    "/images/wal14.jpg",
];

const useWallpaperStore = create(
  immer((set) => ({
    wallpapers: WALLPAPERS,
    activeIndex: 0,

    setNextWallpaper: () =>
      set((state) => {
        state.activeIndex = (state.activeIndex + 1) % state.wallpapers.length;
      }),
  }))
);

export default useWallpaperStore;