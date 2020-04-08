import {
  GET_MOVIES,
  GET_MOVIE,
  GET_MOVIE_TIMES,
  CLEAN_MOVIES,
  DELETE_MOVIE,
  MOVIES_LOADING,
  MOVIE_TIMES_LOADING,
} from '../actions/types';

const initialState = {
  movies: [],
  movie: {},
  movieTimes: [],
  loading: false,
  movieTimesLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case GET_MOVIE_TIMES:
      return {
        ...state,
        movieTimes: action.payload,
        movieTimesLoading: false,
      };
    case CLEAN_MOVIES: {
      return {
        ...state,
        movies: [],
        movie: {},
        movieTimes: [],
        loading: false,
      };
    }
    case MOVIE_TIMES_LOADING:
      return { ...state, movieTimesLoading: true };
    case MOVIES_LOADING:
      return { ...state, loading: true };
    case DELETE_MOVIE:
    default:
      return state;
  }
}
