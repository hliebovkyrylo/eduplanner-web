import thunkMiddleware from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { scheduleReducer } from "./slices/schedules";

const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
  },
  middleware: [thunkMiddleware]
});

export default store;