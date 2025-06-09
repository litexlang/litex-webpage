import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface CodeState {
  value: string;
}

const initialState: CodeState = {
  value: `obj x R, y R:
    2 * x + 3 * y = 10
    4 * x + 5 * y = 14

2 * (2 * x + 3 * y) = 2 * 10
4* x + 6 * y = 2 * 10
(4*x + 6 * y) - (4*x + 5 * y) = 2 * 10 - 14
(4*x + 6 * y) - (4*x + 5 * y) = y
y  = 6
2 * x + 3 * 6 = 10
2 * x + 18 - 18 = 10 - 18
2 * x + 18 - 18 = -8
(2 * x) / 2 = -8 / 2
(2 * x) / 2 = x
x = -4`,
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
