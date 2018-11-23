import { GET_ROSTER, GET_GLOBAL, ENGINEERS_LOADING } from '../actions/types';

const initialState = {
  roster: [],
  global: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ENGINEERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ROSTER:
      return {
        ...state
      };
    case GET_GLOBAL:
      return {
        ...state
      };
    default:
      return state;
  }
}
