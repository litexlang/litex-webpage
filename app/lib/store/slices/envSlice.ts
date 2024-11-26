import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface EnvState {
  value: Object;
}

const initialState: EnvState = {
  value: [],
};

export const envSlice = createSlice({
  name: "env",
  initialState,
  reducers: {
    modifyEnv: (state, action: PayloadAction<Object>) => {
      state.value = action.payload;
    },
  },
});

export const { modifyEnv } = envSlice.actions;

export const selectEnv = (state: RootState) => state.env.value;

export default envSlice.reducer;
