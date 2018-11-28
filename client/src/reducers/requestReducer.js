import {
  GET_REQUESTS,
  GET_REQUEST_COUNT,
  MAKE_REQUEST,
  REQUESTS_LOADING,
  CLEAR_SUCCESS
} from '../actions/types';

const initialState = {
  request: {},
  requests: [],
  count: 0,
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
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
        loading: false
      };
    case GET_REQUEST_COUNT:
      return {
        ...state,
        count: action.payload
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
