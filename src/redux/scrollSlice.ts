// scrollSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ScrollState {
  scrollToLocation: boolean;
  scrollToCartArea: boolean;
}

const initialState: ScrollState = {
  scrollToLocation: false,
  scrollToCartArea: false,
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    scrollToLocationMap: (state) => {
      state.scrollToLocation = true;
    },
    resetScroll: (state) => {
      state.scrollToLocation = false;
    },
    scrollToCartItemArea: (state) => {
      state.scrollToCartArea = true;
    },
    resetCartItemArea: (state) => {
      state.scrollToCartArea = false;
    },
  },
});

export const { scrollToLocationMap, resetScroll, scrollToCartItemArea, resetCartItemArea } = scrollSlice.actions;
export default scrollSlice.reducer;
