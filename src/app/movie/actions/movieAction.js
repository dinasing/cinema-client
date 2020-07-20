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
} from '../../common/actions/types';
import axios from 'axios';
import { returnErrors } from '../../common/actions/errorAction';

export const addMovie = ({
  title,
  release_date,
  end_date,
  genre,
  description,
  poster,
  language,
}) => dispatch => {
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
    .post('/movie', body)
    .then(response => {
      dispatch({
        type: ADD_MOVIES,
        payload: response.data,
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_MOVIES_FAIL'));
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
export const deleteMovie = id => dispatch => {
  axios
    .delete(`/movie/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_MOVIE,
        payload: id,
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const editMovie = movie => dispatch => {
  axios
    .put(`/movie/${movie.id}`, movie)
    .then(() => {
      dispatch({
        type: EDIT_MOVIE,
        payload: movie,
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
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
