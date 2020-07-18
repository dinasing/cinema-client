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
  EDIT_MOVIE_FAIL,
  GET_MOVIES_FROM_THE_MOVIE_DB,
  GET_MOVIES_FROM_THE_MOVIE_DB_FAIL,
  GET_GENRES_FAIL,
  GET_GENRES,
} from '../../common/actions/types';

const initialState = {
  movies: [],
  movie: {},
  movieTimes: [],
  loading: false,
  movieTimesLoading: false,
  moviesFromTheMovieDB: { results: [] },
  genres: [],
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
          if (movie.id == action.payload.id)
            for (const key in action.payload) {
              movie[key] = action.payload[key];
            }
          return movie;
        }),
      };
    case MOVIE_TIMES_LOADING:
      return { ...state, movieTimesLoading: true };
    case MOVIES_LOADING:
      return { ...state, loading: true };

    case ADD_MOVIES:
      state.movies.unshift(action.payload);
      return { ...state };
    case GET_MOVIES_FROM_THE_MOVIE_DB:
      return {
        ...state,
        moviesFromTheMovieDB: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case (ADD_MOVIES_FAIL, EDIT_MOVIE_FAIL, GET_MOVIES_FROM_THE_MOVIE_DB_FAIL, GET_GENRES_FAIL):
    default:
      return state;
  }
}
