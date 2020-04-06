import { GET_CINEMAS, DELETE_CINEMA, CINEMAS_LOADING } from '../actions/types';

const initialState = {
  cinemas: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CINEMAS:
      return {
        ...state,
        cinemas: action.payload,
        loading: false,
      };
    case CINEMAS_LOADING:
      return { ...state, loading: true };
    case DELETE_CINEMA:
    default:
      return state;
  }
}
