import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { be_api } from "../api/api";

export const fetchAllTopics = createAsyncThunk(
  "topics/fetchAllTopics",
  async () => {
    return await be_api.topics.getAll();
  }
);

export const fetchTopicsDetails = createAsyncThunk(
  "topics/:slug",
  async (slug) => {
    return await be_api.topics.getDetails(slug);
  }
);


const topicSlice = createSlice({
  name: "topics",
  initialState: {
    topics: [],
    loading: false,
    topicDetails: null,
    topicDetailsLoading: true,
    error: null
  },
  extraReducers: (builder) => {
    builder
       // ALL TOPICS
      .addCase(fetchAllTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchAllTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //TOPIC DETAILS
      .addCase(fetchTopicsDetails.pending, (state) => {
        state.topicDetailsLoading = true;
      })
      .addCase(fetchTopicsDetails.fulfilled, (state, action) => {
        state.topicDetailsLoading = false;
        state.topicDetails = action.payload;
      })
      .addCase(fetchTopicsDetails.rejected, (state, action) => {
        state.topicDetailsLoading = false;
        state.error = action.error.message;
      });
  },
});

export default topicSlice.reducer;
