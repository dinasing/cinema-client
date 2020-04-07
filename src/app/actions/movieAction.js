import { GET_MOVIES, MOVIES_LOADING, GET_MOVIE } from './types';
import axios from 'axios';

export const getMovies = () => dispatch => {
  dispatch(setCinemasLoading());
  axios.get('/movie').then(res =>
    dispatch({
      type: GET_MOVIES,
      payload: res.data,
    })
  );
};

export const getMovieById = id => dispatch => {
  dispatch(setCinemasLoading());
  axios.get('/movie/' + id).then(res =>
    dispatch({
      type: GET_MOVIE,
      payload: res.data,
    })
  );
};

export const setCinemasLoading = () => {
  return { type: MOVIES_LOADING };
};
