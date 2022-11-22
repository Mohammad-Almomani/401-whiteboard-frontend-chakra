import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer";
import formSlicer from "./formValidationSlicer";
import postSlicer from "./postSlicer";

  export const store = configureStore({
  reducer: {
    auth: authSlicer,
    post: postSlicer,
    validation: formSlicer,
  },
});
