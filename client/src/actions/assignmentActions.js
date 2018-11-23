import axios from 'axios';
import {
  GET_ASSIGNMENTS,
  ASSIGNMENTS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/types';

// Get Assignments
export const getAssignments = eid => dispatch => {
  dispatch(setAssignmentLoading());
  axios
    .get('api/engineers/assignments')
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: null
      })
    );
};

// Set loading state
export const setAssignmentLoading = () => {
  return {
    type: ASSIGNMENTS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
