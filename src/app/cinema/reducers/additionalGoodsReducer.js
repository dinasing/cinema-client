import {
  GET_GOODS,
  ADD_GOODS,
  ADD_GOODS_FAIL,
  EDIT_GOODS,
  EDIT_GOODS_FAIL,
  DELETE_GOODS,
  DELETE_GOODS_FAIL,
} from '../../common/actions/types';

const initialState = {
  additionalGoods: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GOODS:
      return {
        ...state,
        additionalGoods: [].concat(action.payload),
      };
    case ADD_GOODS:
      state.additionalGoods.unshift(action.payload);
      return { ...state };
    case DELETE_GOODS:
      return {
        ...state,
        additionalGoods: state.additionalGoods.filter(goods => goods.id !== action.payload),
      };
    case EDIT_GOODS:
      return {
        ...state,
        additionalGoods: state.additionalGoods.map(goods => {
          if (goods.id == action.payload.id)
            for (const key in action.payload) {
              goods[key] = action.payload[key];
            }
          return goods;
        }),
      };
    case ADD_GOODS_FAIL:
    case DELETE_GOODS_FAIL:
    case EDIT_GOODS_FAIL:
    default:
      return state;
  }
}
