import axios from "../../axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  schedules: {
    items: [] as any[],
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

export const deleteSchedule = createAsyncThunk<void, string>('projects/userProjects', async (_id) => {
    await axios.delete(`/schedule/delete/${_id}`);
  }
);

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
    .addCase(deleteSchedule.fulfilled, (state, action) => {
      state.schedules.items = state.schedules.items.filter(obj => obj._id !== action.payload);
      state.schedules.status = 'loaded';
    })    
  }
});

export const scheduleReducer = scheduleSlice.reducer;