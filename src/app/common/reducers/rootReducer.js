import { combineReducers } from 'redux';
import authReducer from '../../auth/reducers/authReducer';
import errorReducer from './errorReducer';
import cinemaReducer from '../../cinema/reducers/cinemaReducer';
import cinemaHallReducer from '../../cinema/reducers/cinemaHallReducer';
import movieReducer from '../../movie/reducers/movieReducer';
import seatTypeReducer from '../../seatType/reducers/seatTypeReducer';
import movieTimeReducer from '../../movie times/reducers/movieTimeReducer';
import additionalGoodsReducer from '../../cinema/reducers/additionalGoodsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  cinema: cinemaReducer,
  cinemaHall: cinemaHallReducer,
  movie: movieReducer,
  seatType: seatTypeReducer,
  movieTime: movieTimeReducer,
  additionalGoods: additionalGoodsReducer,
});

export default rootReducer;
