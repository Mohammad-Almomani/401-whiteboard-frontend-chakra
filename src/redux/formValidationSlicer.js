import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    role: "user",
    notFilled: false,
    NotMatched: false,
    notFilledSignIn: false,
    isValid: false,
    message: "",
    passwordType: "password",
    passwordTypeSignIn: "password",
    contactAdmin: false,
    };

export const formSlicer = createSlice({
  name: 'validation',
  initialState,
  reducers: {
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
        state.contactAdmin = !state.contactAdmin;
        },
       HANDLE_ROLE_CHANGE: (state, action) => {
        state.role = action.payload;
        },
    },
});



export const contactAdminRedux = (state) => state.validation.contactAdmin
export const passwordTypeSignInRedux = (state) => state.validation.passwordTypeSignIn
export const passwordTypeRedux = (state) => state.validation.passwordType
export const messageRedux = (state) => state.validation.message
export const isValidRedux = (state) => state.validation.isValid
export const NotMatchedRedux = (state) => state.validation.NotMatched
export const notFilledSignInRedux = (state) => state.validation.notFilledSignIn
export const notFilledRedux = (state) => state.validation.notFilled
export const roleRedux = (state) => state.validation.role

export const {
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
} = formSlicer.actions;
export default formSlicer.reducer;
