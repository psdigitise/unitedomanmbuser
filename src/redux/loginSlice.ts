// loginSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface SignInPopupState {
  showLoginPopup: boolean;
}

const initialState: SignInPopupState = {
  showLoginPopup: false,
};

export const loginSlice = createSlice({
  name: 'loginPopup',
  initialState,
  reducers: {
    toggleLoginPopup: (state) => {
      state.showLoginPopup = !state.showLoginPopup;
    },

    closeLoginPopup: (state) => {
      state.showLoginPopup = false;
    },

    openLoginPopup: (state) => {
      state.showLoginPopup = true;
    },
  },
});

// Export the action and reducer
export const { toggleLoginPopup, closeLoginPopup, openLoginPopup } = loginSlice.actions;
export default loginSlice.reducer;
