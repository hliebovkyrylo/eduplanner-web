import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

// Initialize initial authentication state
const initialState = {
  user: {
    items: [] as any[], // Initially there is no authentication data
    status: 'loading', // Initial status is set to "loading"
  }
};

// Create an asynchronous thunk to get user data
export const fetchUser = createAsyncThunk('auth/fetchAuthMe', async (userId: any) => { // We get user data by his id
  const { data } = await axios.get(`/user/me/${userId}`); // Route for getting user info

  return data;
});

// Create an asynchronous thunk to upload image
export const uploadImage = createAsyncThunk('upload', async (image: any) => {
  const { data } = await axios.post("/image/upload", image); // Route for upload image

  return data;
});

// Create an asynchronous thunk to create user
export const createUser = createAsyncThunk('user/createInfo', async (params: any) => {
  const { data } = await axios.post("/user/create", params);

  return data;
});

// Checking whether the user is onboarded
export const isOndoarded = createAsyncThunk('user/check', async (userId: any) => {
  const { data } = await axios.post(`/user/isOnboarded/${userId}`);

  return data;
});

// Removing schedules available to me
export const removeStrangeSchedule = createAsyncThunk('user/remove', async ({userId, scheduleId}: {userId: string, scheduleId: string}) => {
  const { data } = await axios.patch(`/user/${userId}/remove/${scheduleId}`);

  return data;
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling pending, fulfilled and rejected events for various asynchronous thunks
    builder
      // Get user info
      .addCase(fetchUser.pending, (state) => {
        state.user.items = [];
        state.user.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.items = action.payload;
        state.user.status = 'loaded';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user.items = [];
        state.user.status = 'error';
      })
      // Upload image
      .addCase(uploadImage.pending, (state) => {
        state.user.items = [];
        state.user.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.items = action.payload;
        state.user.status = 'loaded';
      })
      .addCase(uploadImage.rejected, (state) => {
        state.user.items = [];
        state.user.status = 'error';
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        state.user.items = [];
        state.user.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.items = action.payload;
        state.user.status = 'loaded';
      })
      .addCase(createUser.rejected, (state) => {
        state.user.items = [];
        state.user.status = 'error';
      })
      // Checking whether the user is onboarded
      .addCase(isOndoarded.pending, (state) => {
        state.user.items = [];
        state.user.status = 'loading';
      })
      .addCase(isOndoarded.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.items = action.payload;
        state.user.status = 'loaded';
      })
      .addCase(isOndoarded.rejected, (state) => {
        state.user.items = [];
        state.user.status = 'error';
      })
      // Removing schedules available to me
      .addCase(removeStrangeSchedule.pending, (state) => {
        state.user.items = [];
        state.user.status = 'loading';
      })
      .addCase(removeStrangeSchedule.fulfilled, (state, action: PayloadAction<any>) => {
        state.user.items = action.payload;
        state.user.status = 'loaded';
      })
      .addCase(removeStrangeSchedule.rejected, (state) => {
        state.user.items = [];
        state.user.status = 'error';
      })
  },
});

// Export the reducer and action creator
export const userReducer = userSlice.reducer;