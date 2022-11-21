import * as React from "react";
import AddPostForm from "./Add-post-form";
import ModalFather from "./modalFather";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { postsRedux } from "../redux/authSlicer";
import { logoutHandler } from "../actions/AuthActions";

export default function Posts() {
  const dispatch = useDispatch();
  const post = useSelector(postsRedux)


  return (
    <VStack>
      <AddPostForm />

      <SimpleGrid columns={[1,2,3]} spacing={10} >
        {post &&
          post.map((pos, idx) => {
            return (
              <Box  key={idx}>
                <ModalFather
                  username={pos.username}
                  content={pos.content}
                  id={pos.id}
                  usersComments={pos.usersComments}
                  title={pos.title}
                  imgURL={pos.imgURL}
                />
               </Box>
            );
          })}
      </SimpleGrid>
      <Box>
      <a style={{ display: "block", marginTop: "2%" }}>
        You are done here? don't forget to
      </a>
        {<button onClick={() => logoutHandler(dispatch)}>Sign Out</button>}
      </Box>
    </VStack>
  );
}
