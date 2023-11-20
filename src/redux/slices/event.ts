import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

// Initialize initial authentication state
const initialState = {
  events: {
    items: [] as any[], // Initially there is no authentication data
    status: 'loading', // Initial status is set to "loading"
  }
};

// Create an asynchronous thunk to create event
export const createEvent = createAsyncThunk('event/createEvent', async ({ params, currentUser, parentId }: { params: any, currentUser: string, parentId: string }) => {
  const { data } = await axios.post(`/event/create?userId=${currentUser}&parentId=${parentId}`, params);

  return data;
});

// Create an asynchronous thunk to fetch all events event
export const fetchAllEvents = createAsyncThunk('events/getAllEvents', async (params: { id: any, userId: any }) => {
  const { data } = await axios.get(`/event/getAll/${params.id}?userId=${params.userId}`);

  return data;
});

// Create an asynchronous thunk to create event
export const fetchEvent = createAsyncThunk('events/getEvent', async (id: any) => {
  const { data } = await axios.get(`/event/${id}`);

  return data;
});

// Create an asynchronous thunk to create event
export const updateEvent = createAsyncThunk('event/update', async ({ id, params, currentUser }: { id: string, params: any, currentUser: string }) => {
  const { data } = await axios.patch(`/event/${id}/update?userId=${currentUser}`, params);

  return data;
});

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Create event
    .addCase(createEvent.pending, (state) => {
      state.events.items = [];
      state.events.status = 'loading';
    })
    .addCase(createEvent.fulfilled, (state, action: PayloadAction<any>) => {
      state.events.items = action.payload;
      state.events.status = 'loaded';
    })
    .addCase(createEvent.rejected, (state) => {
      state.events.items = [];
      state.events.status = 'error';
    })
    // Fetch all events
    .addCase(fetchAllEvents.pending, (state) => {
      state.events.items = [];
      state.events.status = 'loading';
    })
    .addCase(fetchAllEvents.fulfilled, (state, action: PayloadAction<any>) => {
      state.events.items = action.payload;
      state.events.status = 'loaded';
    })
    .addCase(fetchAllEvents.rejected, (state) => {
      state.events.items = [];
      state.events.status = 'error';
    })
    // Fetch event
    .addCase(fetchEvent.pending, (state) => {
      state.events.items = [];
      state.events.status = 'loading';
    })
    .addCase(fetchEvent.fulfilled, (state, action: PayloadAction<any>) => {
      state.events.items = action.payload;
      state.events.status = 'loaded';
    })
    .addCase(fetchEvent.rejected, (state) => {
      state.events.items = [];
      state.events.status = 'error';
    })
    // Update event
    .addCase(updateEvent.pending, (state) => {
      state.events.items = [];
      state.events.status = 'loading';
    })
    .addCase(updateEvent.fulfilled, (state, action: PayloadAction<any>) => {
      state.events.items = action.payload;
      state.events.status = 'loaded';
    })
    .addCase(updateEvent.rejected, (state) => {
      state.events.items = [];
      state.events.status = 'error';
    })
  }
});

export const eventReducer = eventSlice.reducer;