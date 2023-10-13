import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

interface AuthState {
  data: any; 
  status: string;
}

const initialState: AuthState = {
  data: null,
  status: "loading",
};

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: any) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchReg = createAsyncThunk('auth/fetchReg', async (params: any) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      window.localStorage.removeItem("token");
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReg.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchReg.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchReg.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      });
  },
});

export const authReducer = authSlice.reducer;

export const isAuthSelector = (state: any) => Boolean(state.auth.data)

export const { logout } = authSlice.actions;

