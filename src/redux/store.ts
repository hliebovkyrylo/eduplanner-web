import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "./slices/user";
import { scheduleReducer } from "./slices/schedules";
import { eventReducer } from "./slices/event";

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer,
    event: eventReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
