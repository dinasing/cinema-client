import {
  GET_SIT_TYPES,
  GET_SIT_TYPE,
  DELETE_SIT_TYPE,
  EDIT_SIT_TYPE,
  ADD_SIT_TYPE,
  ADD_SIT_TYPE_FAIL,
} from '../../common/actions/types';

const initialState = {
  sitsTypes: [],
  sitType: {},
  loading: false,
  cinemasLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SIT_TYPES:
      return {
        ...state,
        sitsTypes: action.payload,
        loading: false,
      };
    case GET_SIT_TYPE:
      return {
        ...state,
        sitType: action.payload,
        loading: false,
      };
    case DELETE_SIT_TYPE:
      return {
        ...state,
        sitsTypes: state.sitsTypes.filter(sitType => sitType.id !== action.payload),
      };

    case EDIT_SIT_TYPE:
      return {
        ...state,
        sitsTypes: state.sitsTypes.map(sitType => {
          return sitType.id == action.payload.id ? action.payload : sitType;
        }),
      };
    case ADD_SIT_TYPE:
      state.sitsTypes.unshift(action.payload);
      return { ...state };

    case ADD_SIT_TYPE_FAIL:
    default:
      return state;
  }
}
