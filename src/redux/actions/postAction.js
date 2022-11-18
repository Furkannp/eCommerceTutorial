/* eslint-disable no-undef */
import axios from 'axios';
import { toast } from 'react-toastify';
import { authHeader } from '../../helpers';

function request(namespace) {
  return {
    type: `${namespace}/POST_REQUEST`,
  };
}

function success(namespace, data) {
  return {
    type: `${namespace}/POST_SUCCESS`,
    data,
  };
}

function failure(namespace, error) {
  return {
    type: `${namespace}/POST_FAILURE`,
    error,
  };
}


export function postAction(namespace, id, values) {
  return dispatch => {
    dispatch(request(namespace));
    axios.post(`${process.env.REACT_APP_API_URL}/${namespace}${id ? `/${id}` : ''}`, values || {}, authHeader())
      .then(res => {
          dispatch(success(namespace, res.data));
          toast.success("Başarılı")
      })
      .catch((error) => {
        dispatch(failure(namespace, error));
        toast.error("Kaydetme Hatası")
      });
  };
}
