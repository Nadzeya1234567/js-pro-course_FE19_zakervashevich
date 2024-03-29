import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsGrade } from "../../enums/PostGrade";
import Storage from "../../helpers/Storage";
import PostType from "../../types/postType";
import { fetchPosts } from "./postsThunks";

type GradesType = {
  [prop: number]: PostsGrade;
};
//grades = {
//  [1]: +1, - поста с id 1 лайкнут
//  [2]: -1, - поста с id 2 дизлайкнут
//}

type StoreType = {
  data: PostType[];
  grades: GradesType;
  bookmarks: number[];
  count: number;
  loading: boolean;
  error?: string;
};

const initialState: StoreType = {
  data: [],
  count: 0,
  grades: Storage.get("grades", {}),
  bookmarks: Storage.get("bookmarks", []),
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchAllPosts: () => {},

    fetchMyPosts: () => {},

    setPosts: (state, { payload }: PayloadAction<PostType[]>) => {
      state.data = payload;
    },
    setPostsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setPostsError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.error = payload;
    },

    likePost: (state, { payload: postId }: PayloadAction<number>) => {
      if (state.grades[postId] === PostsGrade.like) {
        delete state.grades[postId];
      } else {
        state.grades[postId] = PostsGrade.like;
      }

      Storage.set("grades", state.grades);
    },
    dislikePost: (state, { payload: postId }: PayloadAction<number>) => {
      if (state.grades[postId] === PostsGrade.dislike) {
        delete state.grades[postId];
      } else {
        state.grades[postId] = PostsGrade.dislike;
      }

      Storage.set("grades", state.grades);
    },
    bookmarkPost: (state, { payload: postId }: PayloadAction<number>) => {
      if (state.bookmarks.includes(postId)) {
        state.bookmarks = state.bookmarks.filter((id) => id !== postId);
      } else {
        state.bookmarks.push(postId);
      }
      Storage.set("bookmarks", state.bookmarks);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.data = [];
    });
    builder.addCase(fetchPosts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.count = payload.count;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = {
  ...postsSlice.actions,
  fetchPosts,
};
