import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface CodeState {
  value: string;
}

const initialState: CodeState = {
  value: "// Input something",
};

export const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    modifyCode: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { modifyCode } = codeSlice.actions;

export const selectCode = (state: RootState) => state.code.value;

export default codeSlice.reducer;
