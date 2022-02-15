import { combineReducers } from 'redux';
import token from './token';
import testReducer from './testReducer';

const rootReducer = combineReducers({
  testReducer,
  token,
});
export default rootReducer;
