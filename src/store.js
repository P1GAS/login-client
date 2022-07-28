import { configureStore } from "@reduxjs/toolkit";

import accessTokenReducer from "features/accessToken";
import currentUserReducer from "features/currentUser";

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentUser: currentUserReducer,
  },
});

export default store;
