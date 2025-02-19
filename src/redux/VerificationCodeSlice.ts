// VerificationCodeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface VerificationCodePopupState {
    showVerificationCodePopup: boolean;
}

const initialState: VerificationCodePopupState = {
    showVerificationCodePopup: false,
};

export const VerificationCodeSlice = createSlice({
    name: 'verificationCodePopup',
    initialState,
    reducers: {
        toggleVerificationCodePopup: (state) => {
            state.showVerificationCodePopup = !state.showVerificationCodePopup;
        },

        closeVerificationCodePopup: (state) => {
            state.showVerificationCodePopup = false;
        },

        openVerificationCodePopup: (state) => {
            state.showVerificationCodePopup = true;
        },
    },
});

// Export the action and reducer
export const { toggleVerificationCodePopup, closeVerificationCodePopup, openVerificationCodePopup } = VerificationCodeSlice.actions;
export default VerificationCodeSlice.reducer;
