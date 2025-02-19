// registerSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface RegisterPopupState {
  showRegisterPopup: boolean;
}

const initialState: RegisterPopupState = {
  showRegisterPopup: false,
};

export const registerSlice = createSlice({
  name: 'registerPopup',
  initialState,
  reducers: {
    toggleRegisterPopup: (state) => {
      state.showRegisterPopup = !state.showRegisterPopup;
    },
    closeRegisterPopup: (state) => {
      state.showRegisterPopup = false;
    },
    openRegisterPopup: (state) => {
      state.showRegisterPopup = true;
    },
  },
});

// Export the action and reducer
export const { toggleRegisterPopup, closeRegisterPopup, openRegisterPopup } = registerSlice.actions;

export default registerSlice.reducer;
