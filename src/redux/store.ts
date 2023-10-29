import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "./slices/user";
import { scheduleReducer } from "./slices/schedules";

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>; // Определение типа RootState

export default store;
