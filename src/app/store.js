import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth.slice";
import articleReducer from "../modules/article.slice";
import topicReducer from "../modules/topic.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    topics: topicReducer,
  },
});
