import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./slices/codeSlice";
import outputReducer from "./slices/outputSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      code: codeReducer,
      output: outputReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
