import { GET_MOVIES, MOVIES_LOADING, GET_MOVIE, GET_MOVIE_TIMES } from './types';
import axios from 'axios';

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
  axios.get('/movie/' + id + '/movie-time/').then(res =>
    dispatch({
      type: GET_MOVIE_TIMES,
      payload: res.data,
    })
  );
};
export const setMoviesLoading = () => {
  return { type: MOVIES_LOADING };
};
