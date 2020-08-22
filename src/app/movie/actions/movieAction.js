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
  GET_MOVIES_FROM_THE_MOVIE_DB,
  GET_MOVIES_FROM_THE_MOVIE_DB_FAIL,
  GET_GENRES,
  GET_GENRES_FAIL,
} from '../../common/actions/types';
import { returnErrors, clearErrors } from '../../common/actions/errorAction';
import { tokenConfig } from '../../auth/actions/authAction';

const apiKey = '5886c0d8ba5d3a8a90ea37b8b1dc8ca1';

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
    .then(res => {
      dispatch({
        type: ADD_MOVIES,
        payload: res.data,
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
  axios.get('/movie').then(res =>
    dispatch({
      type: GET_MOVIES,
      payload: res.data,
    })
  );
};

export const getMovieById = id => dispatch => {
  dispatch(setMoviesLoading());
  axios.get('/movie/' + id).then(res =>
    dispatch({
      type: GET_MOVIE,
      payload: res.data,
    })
  );
};

export const getMovieTimes = id => dispatch => {
  dispatch(setMoviesToInitialState());
  dispatch(setMoviesTimesLoading());

  axios.get('/movie/' + id + '/movie-time/').then(res =>
    dispatch({
      type: GET_MOVIE_TIMES,
      payload: res.data,
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
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
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
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_MOVIE_FAIL'));
      dispatch({
        type: EDIT_MOVIE_FAIL,
      });
    });
};

export const performSearchFromTheMovieDB = movieTitle => dispatch => {
  axios
    .get(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${apiKey}`)
    .then(res => {
      dispatch({
        type: GET_MOVIES_FROM_THE_MOVIE_DB,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'GET_MOVIES_FROM_THE_MOVIE_DB_FAIL')
      );
      dispatch({
        type: GET_MOVIES_FROM_THE_MOVIE_DB_FAIL,
      });
    });
};

export const getMovieGenres = () => dispatch => {
  axios
    .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(res => {
      dispatch({
        type: GET_GENRES,
        payload: res.data.genres,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'GET_GENRES_FAIL'));
      dispatch({
        type: GET_GENRES_FAIL,
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
