
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
  } from '../actions/authAction';
  
  let token = localStorage.getItem('token');
  
  const initialState = {
    token: token ? token : '',
    error: '',
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOGIN_REQUEST: {
        return {
          ...state,
          loggedIn: true,
          token: action.token,
        };
      }
      case LOGIN_SUCCESS: {
        return {
          ...state,
          loggedIn: true,
          token: action.token,
        };
      }
      case LOGIN_FAILURE: {
        return { ...state, error: 'Girdiğiniz kullanıcı adı veya şifre yanlış.' };
      }
      case LOGOUT: {
        return { ...state };
      }
      default:
        return state;
    }
  }
  