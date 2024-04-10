import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    toggleNotification: (state) => {
      state.notification = !state.notification;
    },
  },
});

export const { toggleNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
