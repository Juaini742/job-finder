import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { userApi } from "@/store/slices/useUserSlice";
import { persistReducer } from "redux-persist";
import storage from "@/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["tracking"],
};

const persistedReducer = persistReducer(persistConfig, userApi.reducer);

export const makeStore = () =>
  configureStore({
    reducer: {
      [userApi.reducerPath]: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/REHYDRATE", "persist/PERSIST"],
        },
      }).concat(userApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);

export default makeStore;
