import axios from "../../axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initialize initial authentication state
const initialState = {
  schedules: {
    items: [] as any[], // Initially there is no authentication data
    status: 'loading', // Initial status is set to "loading"
  }
};

// Create an asynchronous thunk to get user data
export const createSchedule = createAsyncThunk('schedules/createSchedule', async (params: any) => {
  const { data } = await axios.post('/schedule/create', params);

  return data;
});

// Create an asynchronous thunk to get user data
export const fetchUserSchedules = createAsyncThunk('schedules/getAll', async (userId: any) => {
  const { data } = await axios.get(`/schedules/getAllUserSchedules/${userId}`);

  return data;
});

// Deleting a schedule
export const deleteSchedule = createAsyncThunk<void, string>('projects/userProjects', async (_id) => {
    await axios.delete(`/schedule/delete/${_id}`);
  }
);

// Create an asynchronous thunk to change public status
export const updatePublicStatus = createAsyncThunk('schedules/updatePublicStatus', async (id: any) => {
  const { data } = await axios.patch(`/schedule/${id}/changePublicStatus`);

  return data;
})

// Create an asynchronous thunk to get schedule
export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (params: { id: any, userId: string }) => {
  const { data } = await axios.get(`/schedule/${params.id}?userId=${params.userId}`);
  return data;
});

// Create an asynchronous thunk to update schedule
export const updateSchedule = createAsyncThunk('schedule/update', async ({ id, params }: { id: string, params: any }) => {
  const { data } = await axios.patch(`/schedule/update/${id}`, params);

  return data;
  }
);

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Create schedule
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
    // Get user schedules
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
    // Delete schedule
    .addCase(deleteSchedule.fulfilled, (state, action) => {
      state.schedules.items = state.schedules.items.filter(obj => obj._id !== action.payload);
      state.schedules.status = 'loaded';
    })   
    // Update a schedule public status
    .addCase(updatePublicStatus.pending, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'loading';
    })
    .addCase(updatePublicStatus.fulfilled, (state, action: PayloadAction<any>) => {
      state.schedules.items = action.payload;
      state.schedules.status = 'loaded';
    })
    .addCase(updatePublicStatus.rejected, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'error';
    })
    // Fetch schedule
    .addCase(fetchSchedule.pending, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'loading';
    })
    .addCase(fetchSchedule.fulfilled, (state, action: PayloadAction<any>) => {
      state.schedules.items = action.payload;
      state.schedules.status = 'loaded';
    })
    .addCase(fetchSchedule.rejected, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'error';
    })
    // Update schedule
    .addCase(updateSchedule.pending, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'loading';
    })
    .addCase(updateSchedule.fulfilled, (state, action: PayloadAction<any>) => {
      state.schedules.items = action.payload;
      state.schedules.status = 'loaded';
    })
    .addCase(updateSchedule.rejected, (state) => {
      state.schedules.items = [];
      state.schedules.status = 'error';
    })
  }
});

export const scheduleReducer = scheduleSlice.reducer;