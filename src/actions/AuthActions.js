import axios from "axios";
import cookies from "react-cookies";
import {
  FAILED_LOGIN,
  FAILED_SIGNUP,
  GET_PROFILE,
  LOGOUT,
  SUCCESS_LOGIN,
  SUCCESS_SIGNUP,
} from "../redux/authSlicer";
import base64 from "base-64";
import { LOG_HIDE_PASSWORD, LOG_SHOW_PASSWORD, NOT_FILLED_LOGIN, NOT_FILLED_RESET_LOGIN, NOT_FILLED_SIGNUP, NOT_MATCHED_SIGNUP, RESET_SIGNUP, SIGNUP_INVALID, SIGNUP_VALID, SIGN_HIDE_PASSWORD, SIGN_SHOW_PASSWORD } from "../redux/formValidationSlicer";

export const login = (dispatch, payload) => {
  try {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/signin`,
        {},
        {
          headers: {
            Authorization: `Basic ${payload}`,
          },
        }
      )
      .then((res) => {
        cookies.save("token", res.data.token);
        cookies.save("capabilities", JSON.stringify(res.data.capabilities));
        cookies.save("userInfo", JSON.stringify(res.data));
        console.log("res.data", res.data);
        dispatch(SUCCESS_LOGIN(res.data));
      })
      .catch((err) => dispatch(FAILED_LOGIN()));
  } catch (e) {
    dispatch(FAILED_LOGIN());
  }
};

export const logoutHandler = (dispatch) => {
  cookies.remove("userInfo");
  cookies.remove("token");
  cookies.remove("capabilities");
  dispatch(LOGOUT());
};

export const getUserProfile = async (dispatch) => {
  console.log("getting user profile");

  await axios
    .get(`${process.env.REACT_APP_BACKEND}/profile`, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    })
    .then((res) => {
      dispatch(GET_PROFILE(res.data));
      console.log("done getting user info");
    });
};

export const signupAction = (dispatch, payload) => {
  try {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/signup`, payload)
      .then((res) => {
        cookies.save("token", res.data.token);
        cookies.save("capabilities", JSON.stringify(res.data.capabilities));
        cookies.save("userInfo", JSON.stringify(res.data));
        dispatch(SUCCESS_SIGNUP(res.data));
      })
      .catch((e) => dispatch(FAILED_SIGNUP()));
  } catch (e) {
    dispatch(FAILED_SIGNUP());
  }
};

export const canDo = (PostOwner, LoggedUser, userInfo) => {
  if (PostOwner === LoggedUser || userInfo.capabilities.includes("update")) {
    return true;
  }
  return false;
};

export const checkToken = async (dispatch) => {
  const token = cookies.load("token");
  if (token) {
    console.log("token is here");
    getUserProfile(dispatch);
  }
};

export const handleLogIn = (e, dispatch) => {
  e.preventDefault();
  const filledData = new FormData(e.currentTarget);
  dispatch(NOT_FILLED_RESET_LOGIN());
  if (!filledData.get("email") || !filledData.get("password")) {
    dispatch(NOT_FILLED_LOGIN());
    return;
  }
  dispatch(NOT_FILLED_RESET_LOGIN());

  const data = {
    username: filledData.get("email"),
    password: filledData.get("password"),
  };
  const encodedCredintial = base64.encode(`${data.username}:${data.password}`);
  login(dispatch, encodedCredintial);
};

export const togglePasswordSignIn = (dispatch, passwordTypeSignIn) => {
  if (passwordTypeSignIn === "password") {
    dispatch(LOG_SHOW_PASSWORD());
    return;
  }
  dispatch(LOG_HIDE_PASSWORD());
};

export const togglePassword = (dispatch, passwordType) => {
  if (passwordType === "password") {
    dispatch(SIGN_SHOW_PASSWORD());
    return;
  }
  dispatch(SIGN_HIDE_PASSWORD());
};

const emailRegex = /\S+@\S+\.\S+/;

export const validateEmail = (event, dispatch) => {
  const email = event.target.value;
  if (emailRegex.test(email)) {
    dispatch(SIGNUP_VALID());
  } else {
    dispatch(SIGNUP_INVALID());
  }
};

export const signUp = (e, dispatch, isValid, role) => {
  e.preventDefault();
  const filledData = new FormData(e.currentTarget);
  dispatch(RESET_SIGNUP());

  if (
    !filledData.get("email") ||
    !filledData.get("password") ||
    !filledData.get("confirmPassword") ||
    !filledData.get("username")
  ) {
    dispatch(NOT_FILLED_SIGNUP());
    return;
  }
  dispatch(RESET_SIGNUP());

  if (filledData.get("password") !== filledData.get("confirmPassword")) {
    dispatch(NOT_MATCHED_SIGNUP());
    return;
  }
  dispatch(RESET_SIGNUP());

  if (isValid) {
    const data = {
      username: filledData.get("username"),
      email: filledData.get("email"),
      password: filledData.get("password"),
      role: role,
    };
    console.log(data);
    signupAction(dispatch, data);
  }
};
