import { combineReducers } from 'redux';
import playerAndQuestionsReducer from './playerAndQuestionsReducer';
import token from './token';

const rootReducer = combineReducers({
  playerAndQuestionsReducer,
  token,
});
export default rootReducer;
