/* eslint-disable no-undef */

import axios from 'axios';
import { authHeader } from '../../helpers';

function request() {
  return {
    type: `GET_PRODUCTS_REQUEST`,
  };
}

function success(data) {
  return {
    type: `GET_PRODUCTS_SUCCESS`,
    data,
  };
}

function failure(namespace, error) {
  return {
    type: `GET_PRODUCTS_FAILURE`,
    error,
  };
}


export function getProductsAction(query, category) {
  return dispatch => {
    dispatch(request());
    axios.get(`${process.env.REACT_APP_API_URL}/products${category ? `/category/${category}` : ''}${query ? `?${query}` : ''}`, authHeader())
      .then(res => {
          dispatch(success(res.data));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };
}
