import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface ModelsState {
  isOpen: boolean;
  isAddToCart: any;
  modalId: string | null;
  isAddToWishlist: boolean;
  isCustomize: boolean;
  isOrderDetails: boolean;
}

const initialState: ModelsState = {
  isOpen: false,
  isAddToCart: false,
  modalId: null,
  isAddToWishlist: false,
  isCustomize: false,
  isOrderDetails: false,
};

const modelsSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setIsAddToCart(state, action: PayloadAction<boolean>) {
      state.isAddToCart = action.payload;
    },
    setModalId(state, action: PayloadAction<string>) {
      state.modalId = action.payload;
    },
    setIsAddToWishlist(state, action: PayloadAction<boolean>) {
      state.isAddToWishlist = action.payload;
    },
    setIsCustomize(state, action: PayloadAction<boolean>) {
      state.isCustomize = action.payload;
    },
    setIsOrderDetails(state, action: PayloadAction<boolean>) {
      state.isOrderDetails = action.payload;
    },
    resetModels(state) {
      state.isOpen = false;
      state.isAddToCart = false;
      state.isAddToWishlist = false;
      state.isCustomize = false;
      state.isOrderDetails = false;
    },
  },
});

export const {
  setIsOpen,
  setIsAddToCart,
  setModalId,
  setIsAddToWishlist,
  setIsCustomize,
  setIsOrderDetails,
  resetModels,
} = modelsSlice.actions;
export const selectModels = (state: RootState) => state.models;
export default modelsSlice.reducer;
