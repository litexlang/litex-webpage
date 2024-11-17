import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./slices/codeSlice";
import envReducer from "./slices/envSlice";
import outputReducer from "./slices/outputSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      code: codeReducer,
      env: envReducer,
      output: outputReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
