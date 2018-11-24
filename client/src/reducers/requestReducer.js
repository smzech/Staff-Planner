import {
  GET_REQUESTS,
  MAKE_REQUEST,
  REQUESTS_LOADING,
  CLEAR_SUCCESS
} from '../actions/types';

const initialState = {
  request: {},
  requests: [],
  success: false,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUESTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case MAKE_REQUEST:
      return {
        ...state,
        requests: [action.payload, ...state.requests],
        success: true
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
}
