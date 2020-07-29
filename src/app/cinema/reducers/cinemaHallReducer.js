import {
  GET_CINEMA_HALLS,
  GET_CINEMA_HALL,
  DELETE_CINEMA_HALL,
  CINEMA_HALLS_LOADING,
  CLEAN_CINEMA_HALLS,
  ADD_CINEMA_HALL,
  ADD_CINEMA_HALL_FAIL,
  DELETE_CINEMA_HALL_FAIL,
  EDIT_CINEMA_HALL_FAIL,
  EDIT_CINEMA_HALL,
} from '../../common/actions/types';

const initialState = {
  cinemaHalls: [],
  cinemaHall: {},
  loading: false,
  seatsTypes: [],
  newCinemaId: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CINEMA_HALLS:
      return {
        ...state,
        cinemaHalls: [].concat(action.payload),
        loading: false,
      };
    case GET_CINEMA_HALL:
      return {
        ...state,
        cinemaHall: action.payload,
        loading: false,
      };
    case CLEAN_CINEMA_HALLS:
      return {
        ...state,
        cinemaHalls: [],
        cinemaHall: {},
        loading: false,
      };
    case CINEMA_HALLS_LOADING:
      return { ...state, loading: true };
    case ADD_CINEMA_HALL:
      state.cinemaHalls.unshift(action.payload);
      return { ...state };
    case DELETE_CINEMA_HALL:
      return {
        ...state,
        cinemaHalls: state.cinemaHalls.filter(cinemaHall => cinemaHall.id !== action.payload),
      };
    case EDIT_CINEMA_HALL:
      return {
        ...state,
        cinemaHalls: state.cinemaHalls.map(cinemaHall => {
          if (cinemaHall.id == action.payload.id)
            for (const key in action.payload) {
              cinemaHalls[key] = action.payload[key];
            }
          return cinema;
        }),
      };
    case ADD_CINEMA_HALL_FAIL:
    case DELETE_CINEMA_HALL_FAIL:
    case EDIT_CINEMA_HALL_FAIL:
    default:
      return state;
  }
}
