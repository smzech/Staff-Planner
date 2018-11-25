import { GET_ROSTER, GET_GLOBAL, ENGINEERS_LOADING } from '../actions/types';

const initialState = {
  engineer: {},
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
        ...state,
        roster: action.payload,
        loading: false
      };
    case GET_GLOBAL:
      return {
        ...state,
        global: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
