import { combineReducers } from 'redux';
import authReducer from '../../auth/reducers/authReducer';
import errorReducer from './errorReducer';
import cinemaReducer from '../../cinema/reducers/cinemaReducer';
import movieReducer from '../../movie/reducers/movieReducer';
import sitTypeReducer from '../../sitType/reducers/sitTypeReducer';
import movieTimeReducer from '../../movie times/reducers/movieTimeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  cinema: cinemaReducer,
  movie: movieReducer,
  sitType: sitTypeReducer,
  movieTime: movieTimeReducer,
});

export default rootReducer;
