import axios from 'axios';
import {
  GET_CINEMA_HALLS,
  GET_CINEMA_HALL,
  DELETE_CINEMA_HALL,
  CINEMA_HALLS_LOADING,
  CLEAN_CINEMA_HALLS,
  ADD_CINEMA_HALL,
  ADD_CINEMA_HALL_FAIL,
  DELETE_CINEMA_HALL_FAIL,
  EDIT_CINEMA_HALL_FAIL,
  EDIT_CINEMA_HALL,
} from '../../common/actions/types';
import { returnErrors } from '../../common/actions/errorAction';
import { tokenConfig } from '../../auth/actions/authAction';

export const addCinemaHall = ({ title, cinemaId, schema }) => (dispatch, getState) => {
  const cinemaHall = {
    title,
    cinemaId,
    schema,
  };

  axios
    .post('/cinema-hall', cinemaHall, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: ADD_CINEMA_HALL,
        payload: response.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status, 'ADD_CINEMA_HALL_FAIL'));
      }
      dispatch({
        type: ADD_CINEMA_HALL_FAIL,
      });
    });
};

export const getCinemaHalls = () => dispatch => {
  dispatch(setCinemaHallsLoading());
  axios.get(`/cinema-hall/`).then(response =>
    dispatch({
      type: GET_CINEMA_HALLS,
      payload: response.data,
    })
  );
};

export const getCinemaHallById = id => dispatch => {
  dispatch(setCinemaHallsLoading());
  axios.get(`/cinema-hall/${id}`).then(response =>
    dispatch({
      type: GET_CINEMA_HALL,
      payload: response.data,
    })
  );
};

export const editCinema = cinemaHall => (dispatch, getState) => {
  axios
    .put(`/cinema-hall/${cinemaHall.id}`, cinemaHall, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: EDIT_CINEMA_HALL,
        payload: cinemaHall,
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'EDIT_CINEMA_HALL_FAIL'));
      dispatch({
        type: EDIT_CINEMA_HALL_FAIL,
      });
    });
};

export const deleteCinemaHall = id => (dispatch, getState) => {
  axios
    .delete(`/cinema-hall/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_CINEMA_HALL,
        payload: id,
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'DELETE_CINEMA_HALL_FAIL'));
      dispatch({
        type: DELETE_CINEMA_HALL_FAIL,
      });
    });
};

export const setCinemasToInitialState = () => {
  return { type: CLEAN_CINEMA_HALLS };
};

export const setCinemaHallsLoading = () => {
  return { type: CINEMA_HALLS_LOADING };
};
