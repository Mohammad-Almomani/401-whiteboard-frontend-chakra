import * as React from "react";
import { useState } from "react";
import AddCommentForm from "./Add-comment-form";
import { Card } from "react-bootstrap";
import image from "./assets/img.jpg";
import TestModal from "./EditModal";
import { deletePostAction } from "../actions/PostsActions";
import { Box, Button, Stack, StackDivider, useColorMode, useDisclosure, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoRedux } from "../redux/authSlicer";
import { gitPosts } from "../actions/PostsActions";
import { canDo } from "../actions/AuthActions";

export default function ModalFather(props) {
  let [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoRedux)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode();

  const handleShow = () => {
    onOpen();
    setShow(!show);
  };

  return (
    <Stack >
      <Box borderColor='gray.100' 
    borderWidth='2px' 
    p='4' 
    borderRadius='lg' style={{ width: '18rem' }}
    bg={ colorMode === "light"? 'gray.200': 'primary.400'}
    >
        <Card.Img
          variant="top"
          src={props.imgURL ? props.imgURL : image}
          alt={`image of ${props.title}`}
        />
        <Card.Title>
        {props.title}  <br />
        By {props.username}
        </Card.Title>

        <Card.Text>
            {props.content}
        </Card.Text>

          <div>
              Comments:
            {props.usersComments && (
              <VStack spacing={1} divider={<StackDivider />}>
               {/* <p style={{ textAlign: "left" }}> */}
                {props.usersComments.map((com) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a style={{ display: "block" }} key={com.id}>
                    {com.commentAuthor.toUpperCase()}: {com.comment}
                  </a>
                ))}
              {/* </p> */}
            </VStack>
            )}
                     <TestModal
                title={props.title}
                content={props.content}
                id={props.id}
                show={show}
                isOpen={isOpen}
                onClose={onClose}
                handleClose={handleShow}
                imgURL={props.imgURL}
                />

            <AddCommentForm postID={props.id} gitPosts={props.gitPosts} />
                {canDo(userInfo.username, props.username, userInfo) && (
                  <>
                  <Button
            onClick={() => deletePostAction(props.id, gitPosts, dispatch)}
            style={{ marginRight: "2%" }}
            colorScheme='red' variant='outline'
            sx={{ mt: 3, mb: 2 }}
          >
            Delete Post
          </Button>
          <Button onClick={() => handleShow()}  colorScheme='cyan' variant='outline'
          sx={{ mt: 3, mb: 2 }}>
            Edit Post
          </Button>
                  </>
                                )}
          </div>
      </Box>
    </Stack>
  );
}
