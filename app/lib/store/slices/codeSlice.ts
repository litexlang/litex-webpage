import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface CodeState {
  value: string;
}

const initialState: CodeState = {
  value: `// starting with syllogism
def mortal(something);
def something is human => {something is mortal};
let Socrates , Plato: Socrates is human;
Socrates is mortal;
if x : x is human => {x is mortal};
let god : god is not mortal;
prove_by_contradiction god is not human {god is mortal;} contradiction god is mortal;`,
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
