import React from "react";
import { Form } from "react-bootstrap";
import { editPostAction } from "../actions/PostsActions";
import { Button, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoRedux } from "../redux/authSlicer";
import { gitPosts } from "../actions/PostsActions";

export default function TestModal(props) {

  const dispatch = useDispatch();

  const userInfo = useSelector(userInfoRedux)

  const id = props.id;

  const editPost = async (e) => {
    e.preventDefault();
    const post = {
      title: e.target.title.value || props.title,
      content: e.target.content.value || props.content,
      imgURL: e.target.imgURL.value || props.imgURL,
      username: userInfo.username,
      userID: userInfo.id,
    };
    editPostAction(id, post, gitPosts, dispatch);
    e.target.reset();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {/* <LocalFireDepartment count={2} /> */}
        <Form onSubmit={editPost} style={{ margin: "3% 30%" }}>
          <h3>Edit Post</h3> <br />
        <FormLabel htmlFor="title">Title</FormLabel>
          <Form.Control
            margin="normal"
            id="title"
            label="New Title (Optional)"
            type="text"
            name="title"
            placeholder={`${props.title}`}
            />

          <FormLabel sx={{ mt: 3, mb: 2 }} htmlFor="content">Content</FormLabel>
          <Form.Control
            margin="normal"
            name="content"
            label="New Content (Optional)"
            type="text"
            id="content"
            placeholder={props.content}
            />

          <FormLabel sx={{ mt: 3, mb: 2 }} htmlFor="imgURL">Enter Image URL here</FormLabel>
          <Form.Control
            margin="normal"
            name="imgURL"
            label="New Image URL (Optional)"
            type="text"
            id="imgURL"
            placeholder={props.imgURL}
          />

          <Button type="submit" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={props.onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
}
