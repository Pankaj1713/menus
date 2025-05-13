// slices/cart.slice.ts
import { getApi } from "@/api/apiService";
import { APIS } from "@/api/endpoints";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    const deviceId = localStorage.getItem("device_id");
    const res = await getApi(`${APIS.CART_DATA}?deviceId=${deviceId}`);
    return res?.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {
    // optional if you want to manually clear/reset cart
    clearCart(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
