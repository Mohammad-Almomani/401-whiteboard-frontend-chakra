import { createSlice } from "@reduxjs/toolkit";
import cookies from "react-cookies";

const tokenCheck = cookies.load("token") ? cookies.load("token") : "";
const userInfoCheck = cookies.load("userInfo") ? cookies.load("userInfo") : {};
const capabilitiesCheck = cookies.load("capabilities") ? cookies.load("capabilities") : "";

const initialState = {
    userInfo: userInfoCheck,
    isAuthorized: tokenCheck ? true : false,
    capabilities: capabilitiesCheck,
    notAuthed: false,
    token: tokenCheck,
    alreadyExist: false,
    };

export const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SUCCESS_LOGIN: (state, action) => {
        console.log("SUCCESS_LOGIN", action.payload.capabilities);
        state.userInfo = action.payload;
        state.capabilities = action.payload.capabilities;
        state.isAuthorized = true;
        state.notAuthed = false;
        },
    FAILED_LOGIN: (state) => {
        state.notAuthed = true;
    },
    LOGOUT: (state) => {
        state.userInfo = {};
        state.isAuthorized = false;
        state.token = "";
      },

    GET_PROFILE: (state, action) => {
        state.userInfo = action.payload;
        state.capabilities = action.payload.capabilities;
        state.isAuthorized = true;
        state.notAuthed = false;
        },
    SUCCESS_SIGNUP: (state, action) => {
        state.userInfo = action.payload;
        state.token = action.payload.token;
        state.capabilities = action.payload.capabilities;
        state.isAuthorized = true;
        state.notAuthed = false;
        state.alreadyExist = false;
        },
    FAILED_SIGNUP: (state) => {
        state.alreadyExist = true;
        },
    },
});

export const alreadyExistRedux = (state) => state.auth.alreadyExist
export const tokenRedux = (state) => state.auth.token
export const notAuthedRedux = (state) => state.auth.notAuthed
export const isAuthorizedRedux = (state) => state.auth.isAuthorized
export const userInfoRedux = (state) => state.auth.userInfo
export const capabilitiesRedux = (state) => state.auth.capabilities



export const {
    SUCCESS_LOGIN,
    FAILED_LOGIN,
    LOGOUT,
    GET_PROFILE,
    SUCCESS_SIGNUP,
    FAILED_SIGNUP,
} = authSlicer.actions;
export default authSlicer.reducer;
