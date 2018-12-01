import axios from 'axios';
import {
  GET_PROJECTS,
  MAKE_REQUEST,
  PROJECTS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  GET_ROSTER
} from '../actions/types';

// Get projects for PM
export const getProjects = () => dispatch => {
  dispatch(setProjectLoading());
  axios
    .get('api/pmanagers/projects')
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setProjectLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
