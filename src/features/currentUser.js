import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { value: null },
  reducers: {
    userGot(state, action) {
      state.value = action.payload;
    },
    userLoggedOut(state) {
      state.value = null;
    },
  },
});

export const { userGot, userLoggedOut } = currentUserSlice.actions;
export default currentUserSlice.reducer;
