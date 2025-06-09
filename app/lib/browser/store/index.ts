import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./slices/codeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      code: codeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
