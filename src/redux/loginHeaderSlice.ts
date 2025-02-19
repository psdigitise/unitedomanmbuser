// loginHeaderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state interface for the slice
interface LoginHeaderSliceState {
    searchTerm: string;
    location: string;
}

// Initial state
const initialState: LoginHeaderSliceState = {
    searchTerm: '',
    location: '',
};

export const loginHeaderSlice = createSlice({
    name: 'loginHeaderSlice',
    initialState,
    reducers: {
        // Action to clear search and location fields
        clearFields: (state) => {
            state.searchTerm = '';
            state.location = '';
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        }

    },
});

// Export the action and reducer
export const { clearFields, setSearchTerm, setLocation } = loginHeaderSlice.actions;
export default loginHeaderSlice.reducer;
