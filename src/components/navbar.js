/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "./assets/logo-re.png";
import { useLoginContext } from "../Context/AuthContext";
import { Box, Heading, HStack, IconButton, Image, Spacer, Stack, StackDivider, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
// import { HStack } from "@chakra-ui/react";

// const drawerWidth = 240;

function Navbar(props) {
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  const { isAuthorized, handleSignOut, user } = useLoginContext();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
    <HStack >

          <Stack>

      <Image src={logo} alt="logo" style={{ width: "60px" }} />
      ( <Spacer />)

      </Stack>
          <Heading size="md" color="gray.500"
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
              >
                {`Hello, ${user.username?.toUpperCase()}`}
              </Heading>
              ( <Spacer />)

              <Heading size="md" color="gray.500"
                // sx={{ color: "#fff" }}
                onClick={handleSignOut}
                style={{cursor: "pointer"}}
                // as={Link}
                // to="/signin"
                // style={{ fontSize: "1rem" }}
                // className="navLink"
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
      />
    </HStack>
    </>

  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
