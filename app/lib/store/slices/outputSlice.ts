import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface OutputState {
  value: Array<string>;
}

const initialState: OutputState = {
  value: [
    "LiTeX 0.0.1",
    "More information about LiTeX is available at <https://github.com/malloc-realloc/tslitex>",
  ],
};

export const outputSlice = createSlice({
  name: "output",
  initialState,
  reducers: {
    modifyOutput: (state, action: PayloadAction<Array<string>>) => {
      state.value = action.payload;
    },
  },
});

export const { modifyOutput } = outputSlice.actions;

export const selectOutput = (state: RootState) => state.output.value;

export default outputSlice.reducer;
