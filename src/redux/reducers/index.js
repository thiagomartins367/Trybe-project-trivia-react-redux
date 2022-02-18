import { combineReducers } from 'redux';
import player from './player';
import questionsReducer from './questionsReducer';
import token from './token';

const rootReducer = combineReducers({
  questionsReducer,
  token,
  player,
});

export default rootReducer;
