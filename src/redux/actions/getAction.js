/* eslint-disable no-undef */

import axios from 'axios';
import { authHeader } from '../../helpers';

function request(namespace) {
  return {
    type: `${namespace}/GET_REQUEST`,
  };
}

function success(namespace, data) {
  return {
    type: `${namespace}/GET_SUCCESS`,
    data,
  };
}

function failure(namespace, error) {
  return {
    type: `${namespace}/GET_FAILURE`,
    error,
  };
}


export function getAction(namespace, id) {
  return dispatch => {
    dispatch(request(namespace));
    axios.get(`${process.env.REACT_APP_API_URL}/${namespace}${id ? `/${id}` : ''}`, authHeader())
      .then(res => {
          dispatch(success(namespace, res.data));
      })
      .catch((error) => {
        dispatch(failure(namespace, error));
      });
  };
}
