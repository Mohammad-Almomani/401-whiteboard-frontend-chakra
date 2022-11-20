import * as React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, FormLabel } from "react-bootstrap";
import { useLoginContext } from "../Context/AuthContext";
import {  LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Avatar, WrapItem, Heading, VStack, HStack, Box } from "@chakra-ui/react";

export default function MaterialSignIn() {
  const {
    notFilledSignIn,
    notAuthed,
    togglePasswordSignIn,
    handleForgetPassword,
    handleLogIn,
    contactAdmin,
    passwordTypeSignIn,
  } = useLoginContext();



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

          <Form onSubmit={handleLogIn}>

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
                    onClick={togglePasswordSignIn}
                    name="showPassword"
                    value="remember"
                    color="primary"
                  />:
                  <ViewOffIcon
                  style={{ cursor: "pointer" }}
                    onClick={togglePasswordSignIn}
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
                <Link onClick={handleForgetPassword}>Forgot password?</Link>
              </p>
              <p >
                <Link to="/signup" variant="body2" data-testid="signUpRoute">
                  {"Don't have an account? Sign Up"}
                </Link>
              </p>
            </HStack>

        </VStack>
        {contactAdmin && (
          <Alert key="strong" variant="danger" onClick={handleForgetPassword}>
            Please contact the admin to reset your password
          </Alert>
        )}
        </Box>
      </div>

  );
}
