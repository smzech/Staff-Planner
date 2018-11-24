import { combineReducers } from 'redux'; // root reducer file
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import engineerReducer from './engineerReducer';
import assignmentReducer from './assignmentReducer';
import requestReducer from './requestReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  engineer: engineerReducer,
  assignment: assignmentReducer,
  request: requestReducer,
  project: projectReducer
});
