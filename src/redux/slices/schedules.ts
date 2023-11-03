import axios from "../../axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initialize initial authentication state
const initialState = {
  schedules: {
    items: [] as any[], // Initially there is no authentication data
    status: 'lodaing', // Initial status is set to "loading"
  }
};

// Create an asynchronous thunk to get user data
export const createSchedule = createAsyncThunk('schedules/createSchedule', async (params: any) => {
  const { data } = await axios.post('/schedule/create', params);

  return data;
});

// Create an asynchronous thunk to get user data
export const fetchUserSchedules = createAsyncThunk('schedules/getAll', async (userId: any) => {
  const { data } = await axios.get('/schedules/getAllUserSchedules', userId);

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
    .addCase(fetchUserSchedules.pending, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'loading';
    })
    .addCase(fetchUserSchedules.fulfilled, (state, action: PayloadAction<any>) => {
      state.schedules.items = action.payload;
      state.schedules.status = 'loaded';
    })
    .addCase(fetchUserSchedules.rejected, (state) => {
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