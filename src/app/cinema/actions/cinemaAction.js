import {
  GET_CINEMAS,
  GET_CINEMA,
  GET_MOVIE_TIMES_FOR_CINEMA,
  CINEMAS_LOADING,
  MOVIE_TIMES_LOADING,
  CLEAN_CINEMAS,
  ADD_CINEMA,
  ADD_CINEMA_FAIL,
} from '../../common/actions/types';
import axios from 'axios';
import { returnErrors } from '../../common/actions/errorAction';

export const addCinema = ({ title, city, address, photo, description }) => dispatch => {
  const body = {
    title,
    city,
    address,
    photo,
    description,
  };

  axios
    .post('/cinema', body)
    .then(res => {
      dispatch({
        type: ADD_CINEMA,
        payload: res.data,
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CINEMA_FAIL'));
      }
      dispatch({
        type: ADD_CINEMA_FAIL,
      });
    });
};

export const getCinemas = () => dispatch => {
  dispatch(setCinemasLoading());
  axios.get('/cinema').then(res =>
    dispatch({
      type: GET_CINEMAS,
      payload: res.data,
    })
  );
};

export const getCinemaById = id => dispatch => {
  dispatch(setCinemasLoading());
  axios.get('/cinema/' + id).then(res =>
    dispatch({
      type: GET_CINEMA,
      payload: res.data,
    })
  );
};
export const getMovieTimes = id => dispatch => {
  dispatch(setCinemasToInitialState());
  dispatch(setMoviesTimesLoading());
  axios.get('/cinema/' + id + '/movie-time/').then(res =>
    dispatch({
      type: GET_MOVIE_TIMES_FOR_CINEMA,
      payload: res.data,
    })
  );
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
