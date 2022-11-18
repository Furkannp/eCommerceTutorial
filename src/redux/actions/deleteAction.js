/* eslint-disable no-undef */

import axios from 'axios';
import { authHeader } from '../../helpers';
import { toast } from 'react-toastify';

function request(namespace) {
  return {
    type: `${namespace}/DELETE_REQUEST`,
  };
}

function success(namespace, data) {
  return {
    type: `${namespace}/DELETE_SUCCESS`,
    data,
  };
}

function failure(namespace, error) {
  return {
    type: `${namespace}/DELETE_FAILURE`,
    error,
  };
}


export function deleteAction(namespace, id) {
  return dispatch => {
    dispatch(request(namespace));
    axios.delete(`${process.env.REACT_APP_API_URL}/${namespace}${id ? `/${id}` : ''}`, authHeader())
      .then(res => {
          dispatch(success(namespace, res.data));
          toast.success("Silme İşlemi Başarılı")
      })
      .catch((error) => {
        dispatch(failure(namespace, error));
        toast.error("Silme İşlemi Başarısız")

      });
  };
}
