import { GET_ASSIGNMENTS, ASSIGNMENTS_LOADING } from '../actions/types';

const initialState = {
  assignments: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ASSIGNMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload,
        loading: false // once fetched it's not loading anymore
      };
    default:
      return state;
  }
}
