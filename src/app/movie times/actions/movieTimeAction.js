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

export const addMovieTime = newMovieTime => (dispatch, getState) => {
  axios
    .post('/movie-time', newMovieTime, tokenConfig(getState))
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

export const getCinemaHallsForCinema = cinemaId => dispatch => {
  axios
    .get(`/cinema-hall/cinema/${cinemaId}`)
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

export const getSeatsTypes = () => dispatch => {
  axios
    .get('/seat-type')
    .then(res => {
      dispatch({
        type: GET_MOVIE_TIMES,
        payload: res.data,
      });
    })
    .catch(err => {
      if (err.res) dispatch(returnErrors(err.response.data, err.response.status));
      else dispatch(returnErrors(err.message));
    });
};

export const getMovieTimesForCinema = id => dispatch => {
  axios
    .get(`/movie-time/cinema/${id}`)
    .then(res => {
      dispatch({
        type: GET_MOVIE_TIMES,
        payload: res.data,
      });
    })
    .catch(err => {
      if (err.res) dispatch(returnErrors(err.response.data, err.response.status));
      else dispatch(returnErrors(err.message));
    });
};

export const getMoviesForCinema = id => dispatch => {
  axios
    .get(`/movie/cinema/${id}`)
    .then(res => {
      dispatch({
        type: GET_MOVIES_FOR_MOVIE_TIMES,
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

export const deleteMovieTimes = ids => (dispatch, getState) => {
  const body = tokenConfig(getState);
  body.data = { ids };
  axios
    .delete('/movie-time/', body)
    .then(() => {
      dispatch({
        type: DELETE_MOVIE_TIME,
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
