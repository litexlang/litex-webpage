import { configureStore } from "@reduxjs/toolkit";
import targetFormatReducer from "./slices/targetFormatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      targetFormat: targetFormatReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
