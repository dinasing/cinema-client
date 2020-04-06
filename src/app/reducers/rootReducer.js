import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cinemaReducer from './movieTheater';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  cinema: cinemaReducer,
});

export default rootReducer;
