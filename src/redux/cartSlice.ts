import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { validateOTP } from '../api/ApiConfig';
import { AppointmentCardProps } from '../components/Overview/OverviewTabs/Services/AppointmentCard';

interface CartState {
  items: AppointmentCardProps[];
  quantities: { [key: number]: number }; // Map of serviceID to quantity
  token: string | null;
  phoneNumber: string | null;
  otpError: string | null;
  userID: number | null;

}

const initialState: CartState = {
  items: [],
  quantities: {},
  token: null,
  phoneNumber: null,
  otpError: null,
  userID: null,

};

// Thunk for OTP Validation
export const validateOTPThunk = createAsyncThunk('cart/validateOTP', async ({ phoneNumber, otp }: { phoneNumber: string; otp: string }, { rejectWithValue }) => {
  try {
    const response = await validateOTP(phoneNumber, otp); // Call the API for OTP validation
    if (response.status === 'success') {
      // return response.token; // Return the token on success
      return { token: response.token, userID: response.user_id }; // Return both token and loginProviderID

    } else {
      return rejectWithValue(response.message || 'Invalid OTP'); // Return an error if OTP is invalid
    }
  } catch (error: any) {
    return rejectWithValue(error.message || 'OTP validation failed'); // Handle API errors
  }
}
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // Action to add an item to the cart
    addToCart: (state, action: PayloadAction<AppointmentCardProps>) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.serviceID === item.serviceID);
      if (!existingItem) {
        // If the item does not already exist, add it to the cart and initialize its quantity to 1
        state.items.push(item);
        state.quantities[item.serviceID] = 1;
      } else {
        // If the item already exists, just increase its quantity
        state.quantities[item.serviceID] += 1;
      }
    },

    // Action to remove an item from the cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      const serviceID = action.payload;
      // Remove the item from the items array
      state.items = state.items.filter(item => item.serviceID !== serviceID);
      // Remove the corresponding quantity
      delete state.quantities[serviceID];
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.items = [];  // Clear all cart items
      state.quantities = {}; // Clear all quantities
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const serviceID = action.payload;
      if (state.quantities[serviceID] != null) {
        state.quantities[serviceID] += 1; // Increment quantity for the specific item
      } else {
        state.quantities[serviceID] = 1; // Set initial quantity if not present
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const serviceID = action.payload;
      if (state.quantities[serviceID] && state.quantities[serviceID] > 1) {
        state.quantities[serviceID] -= 1; // Decrement quantity if greater than 1
      }
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      sessionStorage.setItem('EnteredPhoneNumber', action.payload); // Sync with session storage
    },
    logout: state => {
      state.token = null;
      state.phoneNumber = null;
      state.userID = null; // Clear User ID
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('EnteredPhoneNumber');
      sessionStorage.removeItem('UserID');
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(validateOTPThunk.fulfilled, (state, action: PayloadAction<string>) => {
      .addCase(validateOTPThunk.fulfilled, (state, action: PayloadAction<{ token: string; userID: number }>) => {
        state.token = action.payload.token;
        state.userID = action.payload.userID;
        sessionStorage.setItem('token', action.payload.token); // Sync with session storage
        sessionStorage.setItem('UserID', String(action.payload.userID)); // Sync with session storage
        state.otpError = null; // Clear OTP error on success
      })
      .addCase(validateOTPThunk.rejected, (state, action) => {
        state.otpError = action.payload as string; // Set OTP error
      });
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, setPhoneNumber, logout } = cartSlice.actions;
export default cartSlice.reducer;
