import { GET_MOVIES, DELETE_MOVIE, MOVIES_LOADING } from '../actions/types';

const initialState = {
  movies: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case MOVIES_LOADING:
      return { ...state, loading: true };
    case DELETE_MOVIE:
    default:
      return state;
  }
}