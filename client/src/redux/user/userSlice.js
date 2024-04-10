import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
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
    deleteAccountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteAccountSuccess: (state) => {
      state.error = null;
      state.loading = false;
      state.currentUser = null;
    },
    deleteAccountFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  uploadImgFailure,
  uploadImgStart,
  uploadImgSuccess,
  deleteAccountFailure,
  deleteAccountStart,
  deleteAccountSuccess,
} = userSlice.actions;

export default userSlice.reducer;
