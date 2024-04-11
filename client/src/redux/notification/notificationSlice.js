import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: false,
  unseenNotifications: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    toggleNotification: (state) => {
      state.notification = !state.notification;
    },
    incrementUnseenNotifications: (state) => {
      state.unseenNotifications += 1;
    },
    decrementUnseenNotifications: (state) => {
      state.unseenNotifications -= 1;
    },
  },
});

export const {
  toggleNotification,
  incrementUnseenNotifications,
  decrementUnseenNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
