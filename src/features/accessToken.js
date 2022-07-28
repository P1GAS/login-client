import { createSlice } from "@reduxjs/toolkit";

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: { value: null },
  reducers: {
    accessTokenGot(state, action) {
      state.value = action.payload;
    },
    accessTokenRemoved(state) {
      state.value = null;
    },
  },
});

export const { accessTokenGot, accessTokenRemoved } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
