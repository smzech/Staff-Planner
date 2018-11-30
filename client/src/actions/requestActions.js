import axios from 'axios';
import {
  GET_REQUESTS,
  GET_REQUEST_COUNT,
  MAKE_REQUEST,
  DELETE_REQUEST,
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
export const getRequests = () => dispatch => {
  dispatch(setRequestsLoading());
  axios
    .get('api/fmanagers/requests')
    .then(res => {
      dispatch({
        type: GET_REQUESTS,
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

// Get Request Count
export const getRequestCount = () => dispatch => {
  axios
    .get('api/fmanagers/reqcount')
    .then(res => {
      dispatch({
        type: GET_REQUEST_COUNT,
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

// Delete a Request
export const deleteRequest = (id, history) => dispatch => {
  console.log(id);
  axios
    .post('api/fmanagers/delete-request', id)
    .then(res => {
      dispatch({
        type: DELETE_REQUEST,
        payload: id
      });
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setRequestsLoading = () => {
  return {
    type: REQUESTS_LOADING
  };
};

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
