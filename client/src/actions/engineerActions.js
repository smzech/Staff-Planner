import axios from 'axios';
import { GET_ROSTER, GET_GLOBAL, ENGINEERS_LOADING } from '../actions/types';

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
        type: GET_ROSTER,
        payload: null
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
        type: GET_GLOBAL,
        payload: null
      })
    );
};

// Set loading state
export const setEngineersLoading = () => {
  return {
    type: ENGINEERS_LOADING
  };
};
