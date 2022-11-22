import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
};

export const postSlicer = createSlice({
  name: "post",
  initialState,
  reducers: {
    FETCH_POSTS: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const postsRedux = (state) => state.post.post;

export const { FETCH_POSTS } = postSlicer.actions;
export default postSlicer.reducer;
