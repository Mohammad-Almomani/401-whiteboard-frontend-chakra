/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import PropTypes from "prop-types";

import logo from "./assets/logo-re.png";
import { useLoginContext } from "../Context/AuthContext";
import { Box, Heading, HStack, IconButton, Image, Spacer, Stack, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// const drawerWidth = 240;

function Navbar(props) {

  const { isAuthorized, handleSignOut, userInfo } = useLoginContext();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
    <HStack >
          <Stack>

      <Image src={logo} alt="logo" style={{ width: "60px" }} />
      ( <Spacer />)

      </Stack>
          <Heading size="md" 
          bgGradient={colorMode === 'dark'?'linear(to-r, primary.200, primary.100)': 'linear(to-r, primary.400, primary.400)' }
          bgClip='text'
          >
            Facebook Ultra Lite
          </Heading>
          ( <Spacer />)

          {isAuthorized && (
            <HStack >
              <Heading size="md" color="gray.500"
                style={{
                  margin: "1% 10px",
                }}
                bgGradient={colorMode === 'dark'?'linear(to-r, primary.200, primary.100)': 'linear(to-r, primary.400, primary.400)' }
                bgClip='text'
              >
                {`Hello, ${userInfo.username?.toUpperCase()}`}
              </Heading>
              ( <Spacer />)

              <Heading size="md" color="gray.500"
                onClick={handleSignOut}
                style={{cursor: "pointer"}}
                bgGradient={colorMode === 'dark'?'linear(to-r, primary.200, primary.100)': 'linear(to-r, primary.400, primary.400)' }
                bgClip='text'
              >
                Sign Out
              </Heading>
            </HStack>
          )}
           ( <Spacer />)
          <IconButton
          display="inline"
          position="sticky-left"
        colorScheme='teal'
        aria-label='Send email'
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        alignSelf='flex-end'
        variant='ghost'
      />
    </HStack>
    </>

  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
