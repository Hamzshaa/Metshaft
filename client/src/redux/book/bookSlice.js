import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    uploadImgStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadImgSuccess: (state) => {
      state.error = null;
      state.loading = false;
    },
    uploadImgFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { uploadImgStart, uploadImgFailure, uploadImgSuccess } =
  bookSlice.actions;

export default bookSlice.reducer;
