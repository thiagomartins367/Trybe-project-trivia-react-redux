import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import testReducer from './testReducer';

const rootReducer = combineReducers({
  testReducer,
  loginReducer,
});
export default rootReducer;
