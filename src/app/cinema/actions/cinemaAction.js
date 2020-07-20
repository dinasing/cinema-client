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

export const addCinema = ({
  title,
  city,
  address,
  photo,
  description,
  cinemaHalls,
}) => dispatch => {
  const cinema = {
    title,
    city,
    address,
    photo,
    description,
    cinemaHalls,
  };

  axios
    .post('/cinema', cinema)
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

export const setMoviesTimesLoading = () => {
  return { type: MOVIE_TIMES_LOADING };
};

export const setCinemasToInitialState = () => {
  return { type: CLEAN_CINEMAS };
};

export const setCinemasLoading = () => {
  return { type: CINEMAS_LOADING };
};
