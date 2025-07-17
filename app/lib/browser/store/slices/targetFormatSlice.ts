import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TargetFormat } from "@/app/lib/structs/enums";

export interface TargetFormatState {
  value: TargetFormat;
}

const initialState: TargetFormatState = { value: TargetFormat.Latex };

export const codeSlice = createSlice({
  name: "targetFormat",
  initialState,
  reducers: {
    setTargetFormat: (state, action: PayloadAction<TargetFormat>) => {
      state.value = action.payload;
    },
  },
});

export const { setTargetFormat } = codeSlice.actions;

export const selectCode = (state: RootState) => state.targetFormat;

export default codeSlice.reducer;
