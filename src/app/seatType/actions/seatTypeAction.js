import {
  GET_SEAT_TYPES,
  GET_SEAT_TYPE,
  DELETE_SEAT_TYPE,
  EDIT_SEAT_TYPE,
  ADD_SEAT_TYPE,
  ADD_SEAT_TYPE_FAIL,
  SEAT_TYPE_LOADING,
} from '../../common/actions/types';
import axios from 'axios';
import { returnErrors } from '../../common/actions/errorAction';

export const addSeatType = ({ title, numberOfPeople }) => dispatch => {
  const body = {
    title,
    numberOfPeople,
  };

  axios
    .post('/seat-type', body)
    .then(response => {
      dispatch({
        type: ADD_SEAT_TYPE,
        payload: response.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status, 'ADD_SEAT_TYPE_FAIL'));
      }
      dispatch({
        type: ADD_SEAT_TYPE_FAIL,
      });
    });
};

export const getSeatTypes = () => dispatch => {
  dispatch(setSeatTypeLoading());
  axios.get('/seat-type').then(response =>
    dispatch({
      type: GET_SEAT_TYPES,
      payload: response.data,
    })
  );
};

export const getSeatTypeById = id => dispatch => {
  dispatch(setSeatTypeLoading());
  axios.get('/seat-type/' + id).then(response =>
    dispatch({
      type: GET_SEAT_TYPE,
      payload: response.data,
    })
  );
};

export const deleteSeatType = id => dispatch => {
  axios
    .delete(`/seat-type/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_SEAT_TYPE,
        payload: id,
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

export const editSeatType = seatType => dispatch => {
  axios
    .put(`/seat-type/${seatType.id}`, seatType)
    .then(() => {
      dispatch({
        type: EDIT_SEAT_TYPE,
        payload: seatType,
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

export const setSeatTypeLoading = () => {
  return { type: SEAT_TYPE_LOADING };
};
