import { createAsyncThunk } from "@reduxjs/toolkit";
import PostsFilterType from "../../component/posts/PostsFilterTypes";
import api from "../../helpers/api";
import PostType from "../../types/postType";

type FetchPostsType = {
  data: PostType[];
  count: number;
};

export const fetchPosts = createAsyncThunk<FetchPostsType, PostsFilterType, { rejectValue: string }>(
  "posts/fetchPosts",
  async ({ page, limit, author, lesson_num, ordering }, thunkApi) => {
    const offset = limit * (page - 1);
    let url = `blog/posts/?limit=${limit}&offset=${offset}&ordering=${ordering}`;

    if (author) {
      url += `&author=${author}`;
    }
    if (lesson_num) {
      url += `&lesson_num=${lesson_num}`;
    }

    try {
      const response = await api.get(url);
      console.log(response);
      return {
        data: response.data.results as PostType[],
        count: response.data.count as number,
      };
    } catch {
      return thunkApi.rejectWithValue("Server error!!!");
    }
  }
);
