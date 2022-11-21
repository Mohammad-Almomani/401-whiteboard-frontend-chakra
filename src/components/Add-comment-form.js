import React from "react";
import axios from "axios";
import {  Form } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoRedux } from "../redux/authSlicer";
import { gitPosts } from "../actions/PostsActions";

export default function AddCommentForm(props) {
  const userInfo = useSelector(userInfoRedux)
  const dispatch = useDispatch();


  const addComment = async (e) => {
    e.preventDefault();
    const comment = {
      comment: e.target.content.value,
      postID: props.postID,
      userID: userInfo.id,
      commentAuthor: userInfo.username,
    };
    try {
      const qq = await axios.post(
        `${process.env.REACT_APP_BACKEND}/comment`,
        comment
      );
      console.log(qq.data);
      e.target.reset();
      gitPosts(dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={addComment} style={{ margin: "10px 50px" }}>
        <Form.Control
           margin="normal"
           id="content"
           label="add comment"
           name="email"
           type="text"
          required
        />

        <Button
          type="submit"
          colorScheme='green' variant='outline'
          sx={{ mt: 3, mb: 2 }}
        >
          {" "}
          Add comment{" "}
        </Button>
      </Form>
    </div>
  );
}
