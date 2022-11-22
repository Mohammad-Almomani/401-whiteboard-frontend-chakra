import * as React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, FormLabel } from "react-bootstrap";
import {  LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Avatar, WrapItem, Heading, VStack, HStack, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { notAuthedRedux } from "../redux/authSlicer";
import { handleLogIn, togglePasswordSignIn } from "../actions/AuthActions";
import { useDispatch } from "react-redux";
import { contactAdminRedux, CONTACT_ADMIN, notFilledSignInRedux, passwordTypeSignInRedux } from "../redux/formValidationSlicer";

export default function MaterialSignIn() {

  const dispatch = useDispatch();

  const passwordTypeSignIn = useSelector(passwordTypeSignInRedux)
  const notFilledSignIn = useSelector(notFilledSignInRedux)
  const notAuthed = useSelector(notAuthedRedux)
  const contactAdmin = useSelector(contactAdminRedux)


  return (
<div style={{alignItems: "center"}}>
    <Box borderColor='gray.100' 
    borderWidth='2px' 
    p='4' 
    borderRadius='lg'
    w={{base: '90vw', sm:'80vw', lg:'50vw', xl:'40vw'}}
    alignSelf='center'
    marginLeft='30%'
    // marginRight='25%'
    

    // position='center'
    >
              <VStack
          sx={{
            marginTop: 8,
          }}
        >
            
          <VStack spacing={10}>
           <WrapItem>
          <Avatar size='lg' icon={<LockIcon fontSize='2rem'/>} />
          </WrapItem>

          <Heading as='h1' size='3xl'>
            Sign in
          </Heading>
          </VStack>

          <Form onSubmit={(e)=>handleLogIn(e, dispatch)}>

          <VStack spacing={4}
          >
            <FormLabel htmlFor="email">Email or Username</FormLabel>
            <Form.Control
              id="email"
              name="email"
              type="text"
              data-testid="username"
              required
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <HStack>
            <Form.Control
              name="password"
              type={passwordTypeSignIn}
              id="password"
              required
              />
              {passwordTypeSignIn == 'password'? <ViewIcon
                  style={{ cursor: "pointer" }}
                    onClick={()=>togglePasswordSignIn(dispatch, passwordTypeSignIn)}
                    name="showPassword"
                    value="remember"
                    color="primary"
                  />:
                  <ViewOffIcon
                  style={{ cursor: "pointer" }}
                  onClick={()=>togglePasswordSignIn(dispatch, passwordTypeSignIn)}
                  name="showPassword"
                    value="remember"
                    color="primary"
                  />}
            </HStack>
            <HStack spacing={10} >
              </HStack>


            {notFilledSignIn && (
              <Alert key="light" variant="danger">
                Please enter your email and password
              </Alert>
            )}
            {notAuthed && (
              <Alert key="strong" variant="danger">
                You are not authorized, please check your login information
              </Alert>
            )}
            <Button
              type="submit"
              data-testid="signInButton"
            >
              Sign In
            </Button>
          </VStack>
          </Form>

            <HStack >
              <p >
                <Link onClick={()=>dispatch(CONTACT_ADMIN())}>Forgot password?</Link>
              </p>
              <p >
                <Link to="/signup" variant="body2" data-testid="signUpRoute">
                  {"Don't have an account? Sign Up"}
                </Link>
              </p>
            </HStack>

        </VStack>
        {contactAdmin && (
          <Alert key="strong" variant="danger" onClick={()=>dispatch(CONTACT_ADMIN())}>
            Please contact the admin to reset your password
          </Alert>
        )}
        </Box>
      </div>

  );
}
