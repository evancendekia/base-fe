import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { be_api } from "../api/api";

export const fetchAllTopics = createAsyncThunk(
  "topics/fetchAllTopics",
  async () => {
    return await be_api.topics.getAll();
  }
);


const topicSlice = createSlice({
  name: "topics",
  initialState: {
    topics: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTopics.fulfilled, (state, action) => {
        console.log("Fetched topics:", action.payload); // Debug log
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchAllTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default topicSlice.reducer;
