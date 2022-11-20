import axios from "axios";
import cookies from "react-cookies";
import { FAILED_LOGIN, FAILED_SIGNUP, GET_PROFILE, LOGOUT, SUCCESS_LOGIN, SUCCESS_SIGNUP } from "../redux/authSlicer";

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
      .catch((e) => dispatch(FAILED_SIGNUP ()));
  } catch (e) {
    dispatch(FAILED_SIGNUP ());
  }
};
