import { createContext, useContext } from "react";
import base64 from "base-64";
import cookies from "react-cookies";
import {
  getUserProfile,
  login,
  logoutHandler,
  signupAction,
} from "../actions/AuthActions";

import { 
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

  passwordTypeSignInRedux,
  passwordTypeRedux,
  messageRedux,
  isValidRedux,
  notFilledSignInRedux,
  NotMatchedRedux,
  notFilledRedux,
  alreadyExistRedux,
  tokenRedux,
  notAuthedRedux,
  isAuthorizedRedux,
  userInfoRedux,
  capabilitiesRedux,
  contactAdminRedux,
  roleRedux, 
  postsRedux} from '../redux/authSlicer';

import { useDispatch, useSelector } from 'react-redux';
import { gitPostsAction } from "../actions/PostsActions";


const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

const LoginContextProvider = (props) => {

  const passwordTypeSignIn = useSelector(passwordTypeSignInRedux)
  const userInfo = useSelector(userInfoRedux)
  const passwordType = useSelector(passwordTypeRedux)
  const message = useSelector(messageRedux)
  const isValid = useSelector(isValidRedux)
  const notFilledSignIn = useSelector(notFilledSignInRedux)
  const NotMatched = useSelector(NotMatchedRedux)
  const notFilled = useSelector(notFilledRedux)
  const alreadyExist = useSelector(alreadyExistRedux)
  const token = useSelector(tokenRedux)
  const notAuthed = useSelector(notAuthedRedux)
  const isAuthorized = useSelector(isAuthorizedRedux)
  const capabilities = useSelector(capabilitiesRedux)
  const contactAdmin = useSelector(contactAdminRedux)
  const role = useSelector(roleRedux)
  const post = useSelector(postsRedux)
  
  const dispatch = useDispatch();

  const handleLogIn = (e) => {
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
    const encodedCredintial = base64.encode(
      `${data.username}:${data.password}`
    );
    login(dispatch, encodedCredintial);
  };

  const handleSignOut = () => {
    logoutHandler(dispatch);
  };

  // forms validation check

  const togglePassword = () => {
    if (passwordType === "password") {
      dispatch(SIGN_SHOW_PASSWORD());
      return;
    }
    dispatch(SIGN_HIDE_PASSWORD());
  };

  const togglePasswordSignIn = () => {
    if (passwordTypeSignIn === "password") {
      dispatch(LOG_SHOW_PASSWORD());
      return;
    }
    dispatch(LOG_HIDE_PASSWORD());
  };

  const handleForgetPassword = () => {
    return dispatch(CONTACT_ADMIN());
  };

  // signup form validation
  const handleRoleChange = (event) => {
    dispatch(HANDLE_ROLE_CHANGE(event.target.value));
  };

  const signUp = (e) => {
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
    dispatch(RESET_SIGNUP ());


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

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      dispatch(SIGNUP_VALID ());
    } else {
      dispatch(SIGNUP_INVALID ());
    }
  };

  const checkToken = async () => {
    const token = cookies.load("token");
    if (token) {
      console.log("token is here");
      getUserProfile(dispatch);
    }
  };

  const canDo = (PostOwner, LoggedUser) => {
    if (PostOwner === LoggedUser || userInfo.capabilities.includes("update")) {
      return true;
    }
    return false;
  };

  const gitPosts = async () => {
    gitPostsAction(dispatch);
  };

  
  const value = {
    gitPosts,
    post,
    notFilled,
    notAuthed,
    togglePassword,
    handleForgetPassword,
    handleLogIn,
    contactAdmin,
    passwordType,
    isAuthorized,
    handleSignOut,
    NotMatched,
    alreadyExist,
    isValid,
    message,
    role,
    handleRoleChange,
    signUp,
    validateEmail,
    togglePasswordSignIn,
    notFilledSignIn,
    userInfo,
    capabilities,
    checkToken,
    token,
    canDo,
    passwordTypeSignIn
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
