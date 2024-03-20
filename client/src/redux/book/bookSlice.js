import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    processStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    processSuccess: (state) => {
      state.error = null;
      state.loading = false;
    },
    processFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { processStart, processFailure, processSuccess } =
  bookSlice.actions;

export default bookSlice.reducer;
