import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/configure";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Async Thunks
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return events;
});

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (newEvent) => {
    const docRef = await addDoc(collection(db, "events"), newEvent);
    return { id: docRef.id, ...newEvent };
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, data }) => {
    await updateDoc(doc(db, 'events', id), data);
    return { id, ...data };
  }
);

export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id) => {
  await deleteDoc(doc(db, "events", id));
  return id;
});
const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((event) => event.id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;
