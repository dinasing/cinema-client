import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cinemaReducer from './cinemaReducer';
import movieReducer from './movieReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  cinema: cinemaReducer,
  movieReducer: movieReducer,
});

export default rootReducer;
