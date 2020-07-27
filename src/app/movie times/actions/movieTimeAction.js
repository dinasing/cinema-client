import axios from 'axios';
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
  GET_SITS_TYPES_FOR_MOVIE_TIMES,
} from '../../common/actions/types';
import { returnErrors } from '../../common/actions/errorAction';
import { tokenConfig } from '../../auth/actions/authAction';

export const addMovieTime = ({ date, time, cinemaHallId, cinemaId, movieId, prices }) => (
  dispatch,
  getState
) => {
  const body = {
    date,
    time,
    cinemaHallId,
    cinemaId,
    movieId,
    prices,
  };

  axios
    .post('/movie-time', body, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: ADD_MOVIE_TIME,
        payload: response.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status, 'ADD_MOVIE_TIME_FAIL'));
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
    .then(response =>
      dispatch({
        type: GET_MOVIE_TIMES,
        payload: response.data,
      })
    )
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status));
      }
    });
};

export const getMovies = () => dispatch => {
  axios
    .get('/movie/for-movie-times')
    .then(response =>
      dispatch({
        type: GET_MOVIES_FOR_MOVIE_TIMES,
        payload: response.data,
      })
    )
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

export const getCinemas = () => dispatch => {
  axios
    .get('/cinema')
    .then(response => {
      dispatch({
        type: GET_CINEMAS_FOR_MOVIE_TIMES,
        payload: response.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status));
      } else {
        dispatch(returnErrors(error.message));
      }
    });
};

export const getCinemaHalls = () => dispatch => {
  axios
    .get('/cinema-hall')
    .then(response => {
      dispatch({
        type: GET_CINEMA_HALLS_FOR_MOVIE_TIMES,
        payload: response.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status));
      } else {
        dispatch(returnErrors(error.message));
      }
    });
};

export const getSitsTypes = () => dispatch => {
  axios
    .get('/seat-type')
    .then(response => {
      dispatch({
        type: GET_SITS_TYPES_FOR_MOVIE_TIMES,
        payload: response.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status));
      } else {
        dispatch(returnErrors(error.message));
      }
    });
};

export const getMovieTimeById = id => dispatch => {
  dispatch(setMovieTimeLoading());
  axios
    .get('/movie-time/' + id)
    .then(response =>
      dispatch({
        type: GET_MOVIE_TIME,
        payload: response.data,
      })
    )
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
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
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
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
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

export const setMovieTimeLoading = () => {
  return { type: MOVIE_TIME_LOADING };
};
