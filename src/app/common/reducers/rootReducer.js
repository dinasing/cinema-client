import { combineReducers } from 'redux';
import authReducer from '../../auth/reducers/authReducer';
import errorReducer from './errorReducer';
import cinemaReducer from '../../cinema/reducers/cinemaReducer';
import movieReducer from '../../movie/reducers/movieReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  cinema: cinemaReducer,
  movie: movieReducer,
});

export default rootReducer;
