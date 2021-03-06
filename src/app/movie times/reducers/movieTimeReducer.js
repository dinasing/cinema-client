import {
  GET_MOVIE_TIMES,
  GET_MOVIE_TIME,
  DELETE_MOVIE_TIME,
  EDIT_MOVIE_TIME,
  ADD_MOVIE_TIME,
  ADD_MOVIE_TIME_FAIL,
  GET_CINEMAS_FOR_MOVIE_TIMES,
  GET_MOVIES_FOR_MOVIE_TIMES,
  GET_CINEMA_HALLS_FOR_MOVIE_TIMES,
  GET_SITS_TYPES_FOR_MOVIE_TIMES,
} from '../../common/actions/types';

const initialState = {
  movieTimes: [],
  movieTime: {},
  loading: false,
  cinemas: [],
  cinemaId: '',
  cinemaHallId: '',
  cinemaHalls: [],
  sitsTypes: [],
  cinemasLoading: false,
  msg: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_TIMES:
      return {
        ...state,
        movieTimes: action.payload,
        loading: false,
      };
    case GET_MOVIE_TIME:
      return {
        ...state,
        movieTime: action.payload,
        loading: false,
      };
    case DELETE_MOVIE_TIME:
      return {
        ...state,
        movieTimes: state.movieTimes.filter(movieTime => movieTime.id !== action.payload),
      };
    case EDIT_MOVIE_TIME:
      return {
        ...state,
        movieTimes: state.movieTimes.map(movieTime => {
          return movieTime.id == action.payload.id ? action.payload : movieTime;
        }),
      };
    case ADD_MOVIE_TIME:
      state.movieTimes.unshift(action.payload);
      return { ...state };
    case GET_CINEMAS_FOR_MOVIE_TIMES:
      return {
        ...state,
        cinemas: action.payload,
      };
    case GET_CINEMA_HALLS_FOR_MOVIE_TIMES:
      return {
        ...state,
        cinemaHalls: action.payload,
      };
    case GET_MOVIES_FOR_MOVIE_TIMES:
      return {
        ...state,
        movies: action.payload,
      };
    case GET_SITS_TYPES_FOR_MOVIE_TIMES:
      return {
        ...state,
        sitsTypes: action.payload,
      };
    case ADD_MOVIE_TIME_FAIL:
    default:
      return state;
  }
}
