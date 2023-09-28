import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface scheduleState {
  items: any,
  status: string,
}

const initialState: scheduleState = {
  items: [],
  status: 'lodaing',
};

export const getSchedules = createAsyncThunk('schedules/getSchedule', async () => {
  const { data } = await axios.get('/schedules/all');

  return data;
});

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getSchedules.pending, (state) => {
      state.items = null;
      state.status = 'loading';
    })
    .addCase(getSchedules.fulfilled, (state, action: PayloadAction<any>) => {
      state.items = action.payload;
      state.status = 'loaded';
    })
    .addCase(getSchedules.rejected, (state) => {
      state.items = null;
      state.status = 'error';
    })
  }
});

export const scheduleReducer = scheduleSlice.reducer;