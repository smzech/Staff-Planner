import axios from 'axios';
import {
  GET_ASSIGNMENTS,
  ASSIGNMENTS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/types';

// Get Assignments for ENGINEER User
export const getAssignments = () => dispatch => {
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
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Assignments by EID, for PM or FM use
export const getAssignmentsByID = eid => dispatch => {
  dispatch(setAssignmentLoading());
  axios
    .post('api/fmanagers/assignments', eid)
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get project's roster
export const getProjectAssignments = pid => dispatch => {
  dispatch(setAssignmentLoading());
  axios
    .post('api/pmanagers/assignments', pid)
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create (or Edit) Assignment

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
