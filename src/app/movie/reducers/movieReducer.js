import {
  GET_MOVIES,
  GET_MOVIE,
  GET_MOVIE_TIMES,
  CLEAN_MOVIES,
  DELETE_MOVIE,
  MOVIES_LOADING,
  MOVIE_TIMES_LOADING,
  EDIT_MOVIE,
  ADD_MOVIES,
  ADD_MOVIES_FAIL,
} from '../../common/actions/types';

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
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.payload),
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
    case EDIT_MOVIE:
      return {
        ...state,
        movies: state.movies.map(movie => {
          return movie.id === action.payload.id ? action.payload : movie;
        }),
      };
    case MOVIE_TIMES_LOADING:
      return { ...state, movieTimesLoading: true };
    case MOVIES_LOADING:
      return { ...state, loading: true };
    case ADD_MOVIES:
      state.movies.unshift(action.payload);
      return { ...state };
    case ADD_MOVIES_FAIL:
    default:
      return state;
  }
}
