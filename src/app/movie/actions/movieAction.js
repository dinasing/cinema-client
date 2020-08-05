import axios from 'axios';
import {
  GET_MOVIES,
  MOVIES_LOADING,
  GET_MOVIE,
  GET_MOVIE_TIMES,
  CLEAN_MOVIES,
  MOVIE_TIMES_LOADING,
  DELETE_MOVIE,
  EDIT_MOVIE,
  ADD_MOVIES,
  ADD_MOVIES_FAIL,
  EDIT_MOVIE_FAIL,
  LOGIN_FAIL,
} from '../../common/actions/types';
import { returnErrors, clearErrors } from '../../common/actions/errorAction';
import { tokenConfig } from '../../auth/actions/authAction';

export const addMovie = ({
  title,
  release_date,
  end_date,
  genre,
  description,
  poster,
  language,
}) => (dispatch, getState) => {
  const body = {
    title,
    release_date,
    end_date,
    genre,
    description,
    poster,
    language,
  };

  axios
    .post('/movie', body, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: ADD_MOVIES,
        payload: response.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch(returnErrors(error.response.data, error.response.status, 'ADD_MOVIES_FAIL'));
      }
      dispatch({
        type: ADD_MOVIES_FAIL,
      });
    });
};

export const getMovies = () => dispatch => {
  dispatch(setMoviesLoading());
  axios.get('/movie').then(response =>
    dispatch({
      type: GET_MOVIES,
      payload: response.data,
    })
  );
};

export const getMovieById = id => dispatch => {
  dispatch(setMoviesLoading());
  axios.get('/movie/' + id).then(response =>
    dispatch({
      type: GET_MOVIE,
      payload: response.data,
    })
  );
};
export const getMovieTimes = id => dispatch => {
  dispatch(setMoviesToInitialState());
  dispatch(setMoviesTimesLoading());

  axios.get('/movie/' + id + '/movie-time/').then(response =>
    dispatch({
      type: GET_MOVIE_TIMES,
      payload: response.data,
    })
  );
};
export const deleteMovie = id => (dispatch, getState) => {
  axios
    .delete(`/movie/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_MOVIE,
        payload: id,
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

export const editMovie = movie => (dispatch, getState) => {
  axios
    .put(`/movie/${movie.id}`, movie, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: EDIT_MOVIE,
        payload: movie,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch(returnErrors(error.response.data, error.response.status, 'EDIT_MOVIE_FAIL'));
      dispatch({
        type: EDIT_MOVIE_FAIL,
      });
    });
};

export const setMoviesLoading = () => {
  return { type: MOVIES_LOADING };
};

export const setMoviesTimesLoading = () => {
  return { type: MOVIE_TIMES_LOADING };
};

export const setMoviesToInitialState = () => {
  return { type: CLEAN_MOVIES };
};
