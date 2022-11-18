/* eslint-disable no-undef */
import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// configLang();

function request() {
  return {
    type: LOGIN_REQUEST,
  };
}

function success(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

function failure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

function userLogout() {
  return {
    type: LOGOUT,
  };
}

export function login(values) {
  return (dispatch) => {
    dispatch(request());
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, values)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch(success(token));
        window.location.replace('/')
      })
      .catch(() => {
        dispatch(failure());
      });
  };
}

export function logout() {
  localStorage.removeItem("token");
  return (dispatch) => {
    dispatch(userLogout());
  };
}
