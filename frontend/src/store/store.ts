import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { userApi } from "@/store/slices/useUserSlice";
import { companyApi } from "./slices/useCompanySlice";
import { jobApi } from "./slices/useJobSlice";
import { persistReducer } from "redux-persist";
import storage from "@/lib/storage";

const appReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["tracking"],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export type AppStore = ReturnType<typeof makeStore>;

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/REHYDRATE",
            "persist/PERSIST",
            "persist/FLUSH",
            "persist/PAUSE",
            "persist/PURGE",
          ],
        },
      }).concat(userApi.middleware, companyApi.middleware, jobApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

  return store;
};

export const wrapper = createWrapper<AppStore>(makeStore);

export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
