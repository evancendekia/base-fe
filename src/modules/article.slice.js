import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { be_api } from "../api/api";
import ArticleDetails from "../pages/ArticleDetails";

export const fetchGroupedArticles = createAsyncThunk(
  "articles/fetchGroupedArticles",
  async (preferences) => {
    return await be_api.articles.getGrouped(preferences);
  }
);

export const fetchDetailsArticles = createAsyncThunk(
  "articles/fetchDetailsArticles",
  async (articleId) => {
    return await be_api.articles.getDetails(articleId);
  }
);


const articleSlice = createSlice({
  name: "articles",
  initialState: {
    grouped: [],
    loading: false,
    articleDetails: null,
    articleDetailsLoading: true,
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
      })


      .addCase(fetchDetailsArticles.pending, (state) => {
        state.articleDetailsLoading = true;
      })
      .addCase(fetchDetailsArticles.fulfilled, (state, action) => {
        state.articleDetailsLoading = false;
        state.articleDetails = action.payload;

      })
      .addCase(fetchDetailsArticles.rejected, (state) => {
        state.articleDetailsLoading = false;
      });
  },
});

export default articleSlice.reducer;
