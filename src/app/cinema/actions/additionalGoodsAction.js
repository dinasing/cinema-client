import axios from 'axios';
import {
  GET_GOODS,
  ADD_GOODS,
  ADD_GOODS_FAIL,
  EDIT_GOODS,
  EDIT_GOODS_FAIL,
  DELETE_GOODS,
  DELETE_GOODS_FAIL,
} from '../../common/actions/types';
import { returnErrors } from '../../common/actions/errorAction';
import { tokenConfig } from '../../auth/actions/authAction';

export const addAdditionalGoods = goods => (dispatch, getState) => {
  axios
    .post('/additional-goods', goods, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_GOODS,
        payload: res.data,
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_GOODS_FAIL'));
      }
      dispatch({
        type: ADD_GOODS_FAIL,
      });
    });
};

export const getAdditionalGoods = cinemaId => dispatch => {
  axios.get(`/additional-goods/${cinemaId}`).then(res =>
    dispatch({
      type: GET_GOODS,
      payload: res.data,
    })
  );
};

export const editAdditionalGoods = goods => (dispatch, getState) => {
  axios
    .put(`/additional-goods/${goods.id}`, goods, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: EDIT_GOODS,
        payload: goods,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_GOODS_FAIL'));
      dispatch({
        type: EDIT_GOODS_FAIL,
      });
    });
};

export const deleteAdditionalGoods = id => (dispatch, getState) => {
  axios
    .delete(`/additional-goods/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_GOODS,
        payload: id,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_GOODS_FAIL'));
      dispatch({
        type: DELETE_GOODS_FAIL,
      });
    });
};
