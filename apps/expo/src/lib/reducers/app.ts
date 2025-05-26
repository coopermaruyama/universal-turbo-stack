import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../redux";

const initialState = {};

export const appSlice = createSlice({
  name: "ap",
  initialState,
  reducers: {},
});

export const actions = appSlice.actions;

export default appSlice.reducer;
