import axios from 'axios';
import {
  GET_REQUESTS,
  MAKE_REQUEST,
  REQUESTS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  CLEAR_SUCCESS
} from '../actions/types';

// create vacation request (Engineers only)
export const makeVacationRequest = requestData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/engineers/vacation', requestData)
    .then(res => {
      dispatch({
        type: MAKE_REQUEST,
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

// create request (PMs only)

// Get Requests

// Clear Success
export const clearSuccess = () => {
  return {
    type: CLEAR_SUCCESS
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
