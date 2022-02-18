import { combineReducers } from 'redux';
import player from './player';
import playerAndQuestionsReducer from './playerAndQuestionsReducer';
import token from './token';

const rootReducer = combineReducers({
  playerAndQuestionsReducer,
  token,
  player,
});

export default rootReducer;
