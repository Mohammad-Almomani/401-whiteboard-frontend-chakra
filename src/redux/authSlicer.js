import { createSlice } from "@reduxjs/toolkit";
import cookies from "react-cookies";

const tokenCheck = cookies.load("token") ? cookies.load("token") : "";
const userInfoCheck = cookies.load("userInfo") ? cookies.load("userInfo") : {};
const capabilitiesCheck = cookies.load("capabilities") ? cookies.load("capabilities") : "";

const initialState = {
    userInfo: userInfoCheck,
    role: "user",
    isAuthorized: tokenCheck ? true : false,
    capabilities: capabilitiesCheck,
    notAuthed: false,
    token: tokenCheck,
    alreadyExist: false,
    notFilled: false,
    NotMatched: false,
    notFilledSignIn: false,
    isValid: false,
    message: "",
    passwordType: "password",
    passwordTypeSignIn: "password",
    contactAdmin: false,
    post: null,
    value: 0,
  };

export const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
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
    RESET_SIGNUP: (state) => {
        state.alreadyExist = false;
        state.notFilled = false;
        state.NotMatched = false;
        },
    NOT_FILLED_SIGNUP: (state) => {
        state.notFilled = true;
        },
    NOT_MATCHED_SIGNUP: (state) => {
        state.NotMatched = true;
        },
    NOT_FILLED_LOGIN: (state) => {
        state.notFilledSignIn = true;
        },
    NOT_FILLED_RESET_LOGIN: (state) => {
        state.notFilledSignIn = false;
        },
    SIGNUP_VALID: (state) => {
        state.isValid = true;
        state.message = "";

        },
    SIGNUP_INVALID: (state) => {
        state.isValid = false;
        state.message = "Invalid Email";
        },
    SIGN_SHOW_PASSWORD: (state) => {
        state.passwordType = "text";
        },
      SIGN_HIDE_PASSWORD: (state) => {
        state.passwordType = "password";
        },
    LOG_SHOW_PASSWORD: (state) => {
        state.passwordTypeSignIn = "text";
        },
    LOG_HIDE_PASSWORD: (state) => {
        state.passwordTypeSignIn = "password";
        },
      CONTACT_ADMIN: (state) => {
        state.contactAdmin = true;
        },
       HANDLE_ROLE_CHANGE: (state, action) => {
        state.role = action.payload;
        },
        FETCH_POSTS: (state, action) => {
            state.post = action.payload;
        },
    },
});


export const selectCountRedux = (state) => state.auth.value
export const passwordTypeSignInRedux = (state) => state.auth.passwordTypeSignIn
export const passwordTypeRedux = (state) => state.auth.passwordType
export const messageRedux = (state) => state.auth.message
export const isValidRedux = (state) => state.auth.isValid
export const notFilledSignInRedux = (state) => state.auth.notFilledSignIn
export const NotMatchedRedux = (state) => state.auth.NotMatched
export const notFilledRedux = (state) => state.auth.notFilled
export const alreadyExistRedux = (state) => state.auth.alreadyExist
export const tokenRedux = (state) => state.auth.token
export const notAuthedRedux = (state) => state.auth.notAuthed
export const isAuthorizedRedux = (state) => state.auth.isAuthorized
export const userInfoRedux = (state) => state.auth.userInfo
export const capabilitiesRedux = (state) => state.auth.capabilities
export const contactAdminRedux = (state) => state.auth.contactAdmin
export const roleRedux = (state) => state.auth.role
export const postsRedux = (state) => state.auth.post


export const {increment, decrement,
    SUCCESS_LOGIN,
    FAILED_LOGIN,
    LOGOUT,
    GET_PROFILE,
    SUCCESS_SIGNUP,
    FAILED_SIGNUP,
    RESET_SIGNUP,
    NOT_FILLED_SIGNUP,
    NOT_MATCHED_SIGNUP,
    NOT_FILLED_LOGIN,
    NOT_FILLED_RESET_LOGIN,
    SIGNUP_VALID,
    SIGNUP_INVALID,
    SIGN_SHOW_PASSWORD,
    SIGN_HIDE_PASSWORD,
    LOG_SHOW_PASSWORD,
    LOG_HIDE_PASSWORD,
    CONTACT_ADMIN,
    HANDLE_ROLE_CHANGE,
    FETCH_POSTS,
} = authSlicer.actions;
export default authSlicer.reducer;
