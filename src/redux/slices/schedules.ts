import axios from "../../axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  schedules: {
    items: [],
    status: 'lodaing',
  }
};

export const getSchedules = createAsyncThunk('schedules/getSchedule', async () => {
  const { data } = await axios.get('/schedules/all');

  return data;
});

export const createSchedule = createAsyncThunk('schedules/createSchedule', async () => {
  const { data } = await axios.post('/schedule/create');

  return data;
});

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getSchedules.pending, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'loading';
    })
    .addCase(getSchedules.fulfilled, (state, action: PayloadAction<any>) => {
      state.schedules.items = action.payload;
      state.schedules.status = 'loaded';
    })
    .addCase(getSchedules.rejected, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'error';
    })
    .addCase(createSchedule.pending, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'loading';
    })
    .addCase(createSchedule.fulfilled, (state, action: PayloadAction<any>) => {
      state.schedules.items = action.payload;
      state.schedules.status = 'loaded';
    })
    .addCase(createSchedule.rejected, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'error';
    })
  }
});

export const scheduleReducer = scheduleSlice.reducer;