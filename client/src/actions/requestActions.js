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

// create vacation request (Engineers only), a form of DELTA request
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

// create INIT request (PMs only)
export const makeInitRequest = (requestData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/pmanagers/init-request', requestData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// create DELTA request
export const makeDeltaRequest = (requestData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/pmanagers/delta-request', requestData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create DELETE request from PM view
export const makeDeleteRequest = requestData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/pmanagers/delete-request', requestData)
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// PM deleting own request
export const deleteRequest = id => dispatch => {
  console.log(id);
  axios
    .post('api/pmanagers/remove-request', id)
    .then(res =>
      dispatch({
        type: DELETE_REQUEST,
        payload: id.id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Requests for FMs
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

// Get Outstanding Requests for PMs
export const getOutstandingRequests = () => dispatch => {
  dispatch(setRequestsLoading());
  axios
    .get('api/pmanagers/outstanding')
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

// Accept an incoming request, FM view
//export const rejectRequest = (id, history) => dispatch => {

// Delete a Request, FM rejecting an incoming request
export const rejectRequest = (id, history) => dispatch => {
  console.log(id);
  axios
    .post('api/fmanagers/delete-request', id)
    .then(res => {
      dispatch({
        type: DELETE_REQUEST,
        payload: id.id
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
