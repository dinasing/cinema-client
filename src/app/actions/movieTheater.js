import { GET_CINEMAS, CINEMAS_LOADING } from './types';
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

export const setCinemasLoading = () => {
  return { type: CINEMAS_LOADING };
};
