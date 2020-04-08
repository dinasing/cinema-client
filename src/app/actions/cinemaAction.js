import {
  GET_CINEMAS,
  GET_CINEMA,
  GET_MOVIE_TIMES_FOR_CINEMA,
  CINEMAS_LOADING,
  MOVIE_TIMES_LOADING,
  CLEAN_CINEMAS,
} from './types';
import axios from 'axios';

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
