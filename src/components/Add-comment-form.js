import React from "react";
import axios from "axios";
import {  Form } from "react-bootstrap";
// import Button from "@mui/material/Button";
// import { TextField } from "@mui/material";
import { useLoginContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostsContext";
import { Button, Input } from "@chakra-ui/react";

export default function AddCommentForm(props) {
  const { user } = useLoginContext();
  const { gitPosts } = usePostContext();

  const addComment = async (e) => {
    e.preventDefault();
    const comment = {
      comment: e.target.content.value,
      postID: props.postID,
      userID: user.id,
      commentAuthor: user.username,
    };
    try {
      const qq = await axios.post(
        `${process.env.REACT_APP_BACKEND}/comment`,
        comment
      );
      console.log(qq.data);
      e.target.reset();
      gitPosts();
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
          // variant="contained"
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
