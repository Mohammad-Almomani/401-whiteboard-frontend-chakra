import * as React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, FormLabel } from "react-bootstrap";
import { useLoginContext } from "../Context/AuthContext";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Select,
  Stack,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignUp() {
  const {
    togglePassword,
    passwordType,
    NotMatched,
    alreadyExist,
    isValid,
    message,
    role,
    handleRoleChange,
    signUp,
    validateEmail,
    notFilled,
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
        <VStack spacing={2}>
          <WrapItem>
            <Avatar size="lg" icon={<LockIcon fontSize="2rem" />} />
          </WrapItem>

          <Heading as="h1" size="3xl">
            Sign up
          </Heading>

          <Form onSubmit={signUp}>
            <VStack spacing={1}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Form.Control
                id="email"
                name="email"
                type="text"
                onChange={validateEmail}
                required
              />
              {!isValid && (
                <div className={`message ${isValid ? "success" : "error"}`}>
                  {message}
                </div>
              )}
              <FormLabel htmlFor="email">Username</FormLabel>
              <Form.Control
                id="username"
                name="username"
                type="text"
                required
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <HStack>
                <Form.Control
                  required
                  id="password"
                  label="Password"
                  type={passwordType}
                  name="password"
                />
                {passwordType === "password" ? (
                  <ViewIcon
                    style={{ cursor: "pointer" }}
                    onClick={togglePassword}
                    name="showPassword"
                    value="remember"
                    color="primary"
                  />
                ) : (
                  <ViewOffIcon
                    style={{ cursor: "pointer" }}
                    onClick={togglePassword}
                    name="showPassword"
                    value="remember"
                    color="primary"
                  />
                )}
              </HStack>
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <HStack>
                <Form.Control
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  type={passwordType}
                  id="confirmPassword"
                  autoComplete="new-password"
                />
                {passwordType === "password" ? (
                  <ViewIcon
                    style={{ cursor: "pointer" }}
                    onClick={togglePassword}
                    name="showPassword"
                    value="remember"
                    color="primary"
                  />
                ) : (
                  <ViewOffIcon
                    style={{ cursor: "pointer" }}
                    onClick={togglePassword}
                    name="showPassword"
                    value="remember"
                    color="primary"
                  />
                )}
              </HStack>
              <HStack xs={12}>
                <FormLabel htmlFor="demo-simple-select">Role</FormLabel>

                <Select
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <option value="user" defaultChecked>
                    User
                  </option>
                  <option value="admin">Admin</option>
                </Select>
              </HStack>
              {notFilled && (
                <Alert key="light" variant="danger">
                  Please fill all the fields
                </Alert>
              )}
              {NotMatched && (
                <Alert key="danger" variant="danger">
                  Your passwords does not match
                </Alert>
              )}
              {alreadyExist && (
                <Alert key="danger" variant="danger">
                  This email already exist
                </Alert>
              )}
              <HStack spacing={10}>
                {/* <FormLabel htmlFor="showPassword"> Show Password</FormLabel> */}
              </HStack>

              <Button
                type="submit"
                // variant="contained"
                // sx={{ mt: 3, mb: 2 }}
                data-testid="signUpButton"
              >
                Sign Up
              </Button>
              <HStack container justifyContent="flex-end">
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </HStack>
            </VStack>
          </Form>
        </VStack>
      </VStack>
    </Box>
    </div>
  );
}
