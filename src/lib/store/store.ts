import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userHandlerReducer from "./slices/user.handler.slice";
import paymentReducer from "./slices/payment.slice";
import sidebarReducer from "./slices/sidebar.slice";
import navigationReducer from "./slices/navigation.slice";
import modelsReducer from "./slices/models.slice";
import cartReducer from "./slices/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  // You can blacklist specific reducers you don't want to persist
  // blacklist: ['someReducer']
};

const rootReducer = {
  userHandler: userHandlerReducer,
  payment: paymentReducer,
  sidebar: sidebarReducer,
  navigation: navigationReducer,
  models: modelsReducer,
  cart: cartReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
