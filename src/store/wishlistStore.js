// useWishlistStore.js

import { create } from "zustand";


const useWishlistStore = create((set) => ({
  numOfWishlistItem: 0,
  setNumOfWishlistItem: (count) => set({ numOfWishlistItem: count }),
  incrementWishlist: () => set((state) => ({ numOfWishlistItem: state.numOfWishlistItem + 1 })),
  decrementWishlist: () => set((state) => ({ numOfWishlistItem: state.numOfWishlistItem - 1 })),
}));

export default useWishlistStore;