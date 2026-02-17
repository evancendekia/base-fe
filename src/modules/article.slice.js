import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { be_api } from "../api/api";

export const fetchGroupedArticles = createAsyncThunk(
  "articles/fetchGroupedArticles",
  async () => {

      console.log("load2")
    return await be_api.articles.getGrouped();
  }
);


const articleSlice = createSlice({
  name: "articles",
  initialState: {
    grouped: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupedArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.grouped = action.payload;
      })
      .addCase(fetchGroupedArticles.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default articleSlice.reducer;
