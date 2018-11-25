import axios from 'axios';
import {
  GET_ROSTER,
  GET_ENGINEER,
  GET_GLOBAL,
  ENGINEERS_LOADING,
  GET_ERRORS
} from '../actions/types';

// Get Roster
export const getRoster = () => dispatch => {
  dispatch(setEngineersLoading());
  axios
    .get('api/fmanagers/roster')
    .then(res =>
      dispatch({
        type: GET_ROSTER,
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

// Get Global Roster
export const getGlobalRoster = () => dispatch => {
  dispatch(setEngineersLoading());
  axios
    .get('api/fmanagers/global')
    .then(res =>
      dispatch({
        type: GET_GLOBAL,
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

// Get Engineer
export const getEngineer = eid => dispatch => {
  dispatch(setEngineersLoading());
  axios
    .post('api/fmanagers/engineer', eid)
    .then(res =>
      dispatch({
        type: GET_ENGINEER,
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

// Set loading state
export const setEngineersLoading = () => {
  return {
    type: ENGINEERS_LOADING
  };
};
