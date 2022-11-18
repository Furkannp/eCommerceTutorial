/* eslint-disable no-undef */

import axios from 'axios';
import { authHeader } from '../../helpers';
import { toast } from 'react-toastify';

function request(namespace) {
  return {
    type: `${namespace}/PUT_REQUEST`,
  };
}

function success(namespace, data) {
  return {
    type: `${namespace}/PUT_SUCCESS`,
    data,
  };
}

function failure(namespace, error) {
  return {
    type: `${namespace}/PUT_FAILURE`,
    error,
  };
}


export function putAction(namespace, id, values) {
  return dispatch => {
    dispatch(request(namespace));
    axios.put(`${process.env.REACT_APP_API_URL}/${namespace}${id ? `/${id}` : ''}`, values, authHeader())
      .then(res => {
          dispatch(success(namespace, res.data));
          toast.success("Başarılı")
      })
      .catch((error) => {
        dispatch(failure(namespace, error));
        toast.error("Bir Hata Oluştu")
      });
  };
}

