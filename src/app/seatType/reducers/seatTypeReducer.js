import {
  GET_SEAT_TYPES,
  GET_SEAT_TYPE,
  DELETE_SEAT_TYPE,
  EDIT_SEAT_TYPE,
  ADD_SEAT_TYPE,
  ADD_SEAT_TYPE_FAIL,
} from '../../common/actions/types';

const initialState = {
  seatsTypes: [],
  seatType: {},
  loading: false,
  cinemasLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEAT_TYPES:
      return {
        ...state,
        seatsTypes: action.payload,
        loading: false,
      };
    case GET_SEAT_TYPE:
      return {
        ...state,
        seatType: action.payload,
        loading: false,
      };
    case DELETE_SEAT_TYPE:
      return {
        ...state,
        seatsTypes: state.seatsTypes.filter(seatType => seatType.id !== action.payload),
      };
    case EDIT_SEAT_TYPE:
      return {
        ...state,
        seatsTypes: state.seatsTypes.map(seatType => {
          return +seatType.id === +action.payload.id ? action.payload : seatType;
        }),
      };
    case ADD_SEAT_TYPE:
      state.seatsTypes.unshift(action.payload);
      return { ...state };
    case ADD_SEAT_TYPE_FAIL:
    default:
      return state;
  }
}
