import { setAccessToken } from "@redux/slices/authSlice";
import { Middleware }     from "@reduxjs/toolkit";

export const authInterceptor: Middleware = ({ dispatch }) => (next) => (action) => {
  if (action.payload?.status === 401) {
    dispatch(setAccessToken(null));
  } else {
    next(action);
  }
};