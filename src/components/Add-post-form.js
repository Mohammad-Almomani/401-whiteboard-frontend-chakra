import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import cookies from "react-cookies";
import Swal from "sweetalert2";
import { useLoginContext } from "../Context/AuthContext";
import { Box, Button, FormLabel, useColorMode } from "@chakra-ui/react";

export default function AddPostForm() {
  const { user, gitPosts } = useLoginContext();
  const { colorMode } = useColorMode();

  const addPost = async (e) => {
    e.preventDefault();
    console.log(e.target.imgURL.value);
    const post = {
      title: e.target.title.value,
      content: e.target.content.value,
      imgURL: e.target.imgURL.value,
      username: user.username,
      userID: user.id,
    };

    await axios
      .post(`${process.env.REACT_APP_BACKEND}/post`, post, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((res) => {
        console.log(res);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Posted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        gitPosts();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops, seems like you are not authorized!",
          text: "Something went wrong!, Please Contact Admin",
        });
      });
  };

  return (
    <Box borderColor='gray.100' 
    borderWidth='2px' 
    p='4' 
    borderRadius='lg'
    bg={colorMode === "light" ? "gray.100" : "gray.700"}
    >
      <Form onSubmit={addPost} >
        <h3>Create Post</h3>

        <FormLabel htmlFor="title">Title*</FormLabel>
        <Form.Control
          // margin="normal"
          id="title"
          type="text"
          name="title"
          required
        />

        <FormLabel htmlFor="content">Content*</FormLabel>
        <Form.Control
          margin="normal"
          name="content"
          label="Type here"
          type="text"
          id="content"
          required
        />

        <FormLabel htmlFor="imgURL">Enter Image URL here</FormLabel>
        <Form.Control
          margin="normal"
          name="imgURL"
          type="url"
          id="imgURL"
        />

        <Button type="submit" colorScheme='blue' variant='outline' sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Form>
    </Box>
  );
}
