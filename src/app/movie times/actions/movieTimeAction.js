import {
  GET_MOVIE_TIMES,
  GET_MOVIE_TIME,
  DELETE_MOVIE_TIME,
  EDIT_MOVIE_TIME,
  ADD_MOVIE_TIME,
  ADD_MOVIE_TIME_FAIL,
  MOVIE_TIME_LOADING,
  GET_MOVIES_FOR_MOVIE_TIMES,
  GET_CINEMA_HALLS_FOR_MOVIE_TIMES,
  GET_CINEMAS_FOR_MOVIE_TIMES,
} from '../../common/actions/types';
import axios from 'axios';
import { returnErrors } from '../../common/actions/errorAction';
import { tokenConfig } from '../../auth/actions/authAction';

export const addMovieTime = ({ date, time, cinemaHallId, cinemaId, movieId }) => (
  dispatch,
  getState
) => {
  const body = {
    date,
    time,
    cinemaHallId,
    cinemaId,
    movieId,
  };

  axios
    .post('/movie-time', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_MOVIE_TIME,
        payload: res.data,
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_MOVIE_TIME_FAIL'));
      }
      dispatch({
        type: ADD_MOVIE_TIME_FAIL,
      });
    });
};

export const getMovieTimes = () => dispatch => {
  dispatch(setMovieTimeLoading());
  axios
    .get('/movie-time')
    .then(res =>
      dispatch({
        type: GET_MOVIE_TIMES,
        payload: res.data,
      })
    )
    .catch(err => {
      if (err.res) dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getMovies = () => dispatch => {
  axios
    .get('/movie/for-movie-times')
    .then(res =>
      dispatch({
        type: GET_MOVIES_FOR_MOVIE_TIMES,
        payload: res.data,
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getCinemas = () => dispatch => {
  axios
    .get('/cinema')
    .then(res => {
      dispatch({
        type: GET_CINEMAS_FOR_MOVIE_TIMES,
        payload: res.data,
      });
    })
    .catch(err => {
      if (err.res) dispatch(returnErrors(err.response.data, err.response.status));
      else dispatch(returnErrors(err.message));
    });
};

export const getCinemaHalls = () => dispatch => {
  axios
    .get('/cinema-hall')
    .then(res => {
      dispatch({
        type: GET_CINEMA_HALLS_FOR_MOVIE_TIMES,
        payload: res.data,
      });
    })
    .catch(err => {
      if (err.res) dispatch(returnErrors(err.response.data, err.response.status));
      else dispatch(returnErrors(err.message));
    });
};

export const getMovieTimeById = id => dispatch => {
  dispatch(setMovieTimeLoading());
  axios
    .get('/movie-time/' + id)
    .then(res =>
      dispatch({
        type: GET_MOVIE_TIME,
        payload: res.data,
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const deleteMovieTime = id => dispatch => {
  axios
    .delete(`/movie-time/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_MOVIE_TIME,
        payload: id,
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const editMovieTime = movieTme => dispatch => {
  axios
    .put(`/movie-time/${movieTme.id}`, movieTme)
    .then(() => {
      dispatch({
        type: EDIT_MOVIE_TIME,
        payload: movieTme,
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setMovieTimeLoading = () => {
  return { type: MOVIE_TIME_LOADING };
};
