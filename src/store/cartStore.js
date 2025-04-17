// useCartStore.js

import { create } from "zustand";

const useCartStore = create((set) => ({
  numOfCartItems: 0,
  setNumOfCartItems: (count) => set({ numOfCartItems: count }),
  incrementCart: ()=> set( ( state)=> ({numOfCartItems: state.numOfCartItems + 1}) ),
  decrementCart: ()=> set( (state)=>({numOfCartItems: state.numOfCartItems - 1}) )
}));

export default useCartStore;