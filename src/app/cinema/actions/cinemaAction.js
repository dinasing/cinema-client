import axios from 'axios';
import {
  GET_CINEMAS,
  GET_CINEMA,
  GET_MOVIE_TIMES_FOR_CINEMA,
  CINEMAS_LOADING,
  MOVIE_TIMES_LOADING,
  CLEAN_CINEMAS,
  ADD_CINEMA,
  ADD_CINEMA_FAIL,
  EDIT_CINEMA,
  EDIT_CINEMA_FAIL,
  DELETE_CINEMA,
  DELETE_CINEMA_FAIL,
} from '../../common/actions/types';
import { returnErrors } from '../../common/actions/errorAction';
import { tokenConfig } from '../../auth/actions/authAction';

export const addCinema = ({ title, city, address, photo, description, cinemaHalls }) => (
  dispatch,
  getState
) => {
  const cinema = {
    title,
    city,
    address,
    photo,
    description,
    cinemaHalls,
  };

  axios
    .post('/cinema', cinema, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: ADD_CINEMA,
        payload: response.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status, 'ADD_CINEMA_FAIL'));
      }
      dispatch({
        type: ADD_CINEMA_FAIL,
      });
    });
};

export const getCinemas = () => dispatch => {
  dispatch(setCinemasLoading());
  axios.get('/cinema').then(response =>
    dispatch({
      type: GET_CINEMAS,
      payload: response.data,
    })
  );
};

export const getCinemaById = id => dispatch => {
  dispatch(setCinemasLoading());
  axios.get('/cinema/' + id).then(response =>
    dispatch({
      type: GET_CINEMA,
      payload: response.data,
    })
  );
};
export const getMovieTimes = id => dispatch => {
  dispatch(setCinemasToInitialState());
  dispatch(setMoviesTimesLoading());
  axios.get('/cinema/' + id + '/movie-time/').then(response =>
    dispatch({
      type: GET_MOVIE_TIMES_FOR_CINEMA,
      payload: response.data,
    })
  );
};

export const editCinema = cinema => (dispatch, getState) => {
  axios
    .put(`/cinema/${cinema.id}`, cinema, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: EDIT_CINEMA,
        payload: cinema,
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'EDIT_CINEMA_FAIL'));
      dispatch({
        type: EDIT_CINEMA_FAIL,
      });
    });
};

export const deleteCinema = id => (dispatch, getState) => {
  axios
    .delete(`/cinema/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_CINEMA,
        payload: id,
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'DELETE_CINEMA_FAIL'));
      dispatch({
        type: DELETE_CINEMA_FAIL,
      });
    });
};

export const setMoviesTimesLoading = () => {
  return { type: MOVIE_TIMES_LOADING };
};

export const setCinemasToInitialState = () => {
  return { type: CLEAN_CINEMAS };
};

export const setCinemasLoading = () => {
  return { type: CINEMAS_LOADING };
};
