import {
  GET_SIT_TYPES,
  GET_SIT_TYPE,
  DELETE_SIT_TYPE,
  EDIT_SIT_TYPE,
  ADD_SIT_TYPE,
  ADD_SIT_TYPE_FAIL,
  SIT_TYPE_LOADING,
} from '../../common/actions/types';
import axios from 'axios';
import { returnErrors } from '../../common/actions/errorAction';

export const addSitType = ({ title, numberOfPeople }) => dispatch => {
  const body = {
    title,
    numberOfPeople,
  };

  axios
    .post('/sit-type', body)
    .then(res => {
      dispatch({
        type: ADD_SIT_TYPE,
        payload: res.data,
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_SIT_TYPE_FAIL'));
      }
      dispatch({
        type: ADD_SIT_TYPE_FAIL,
      });
    });
};

export const getSitTypes = () => dispatch => {
  dispatch(setSitTypeLoading());
  axios.get('/sit-type').then(res =>
    dispatch({
      type: GET_SIT_TYPES,
      payload: res.data,
    })
  );
};

export const getSitTypeById = id => dispatch => {
  dispatch(setSitTypeLoading());
  axios.get('/sit-type/' + id).then(res =>
    dispatch({
      type: GET_SIT_TYPE,
      payload: res.data,
    })
  );
};

export const deleteSitType = id => dispatch => {
  axios
    .delete(`/sit-type/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_SIT_TYPE,
        payload: id,
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const editSitType = sitType => dispatch => {
  axios
    .put(`/sit-type/${sitType.id}`, sitType)
    .then(() => {
      dispatch({
        type: EDIT_SIT_TYPE,
        payload: sitType,
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setSitTypeLoading = () => {
  return { type: SIT_TYPE_LOADING };
};
