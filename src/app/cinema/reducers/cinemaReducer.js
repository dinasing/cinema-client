import {
  GET_CINEMAS,
  GET_CINEMA,
  GET_MOVIE_TIMES_FOR_CINEMA,
  DELETE_CINEMA,
  CINEMAS_LOADING,
  MOVIE_TIMES_LOADING,
  CLEAN_CINEMAS,
  ADD_CINEMA,
  ADD_CINEMA_FAIL,
  GET_SIT_TYPES,
  DELETE_CINEMA_FAIL,
} from '../../common/actions/types';

const initialState = {
  cinemas: [],
  cinema: {},
  movieTimes: [],
  loading: false,
  movieTimesLoading: false,
  sitsTypes: [],
  newCinemaId: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CINEMAS:
      return {
        ...state,
        cinemas: action.payload,
        loading: false,
      };
    case GET_CINEMA:
      return {
        ...state,
        cinema: action.payload,
        loading: false,
      };
    case GET_MOVIE_TIMES_FOR_CINEMA:
      return {
        ...state,
        movieTimes: action.payload,
        movieTimesLoading: false,
      };
    case MOVIE_TIMES_LOADING:
      return { ...state, movieTimesLoading: true };
    case CLEAN_CINEMAS:
      return {
        ...state,
        cinemas: [],
        cinema: {},
        movieTimes: [],
        loading: false,
        movieTimesLoading: false,
      };
    case CINEMAS_LOADING:
      return { ...state, loading: true };
    case ADD_CINEMA:
      state.cinemas.unshift(action.payload);
      return { ...state };
    case DELETE_CINEMA:
      return {
        ...state,
        cinemas: state.cinemas.filter(cinema => cinema.id !== action.payload),
      };

    case ADD_CINEMA_FAIL:
    case DELETE_CINEMA_FAIL:
    default:
      return state;
  }
}
