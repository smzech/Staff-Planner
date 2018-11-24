import { GET_PROJECTS, PROJECTS_LOADING } from '../actions/types';

const initialState = {
  projects: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROJECTS:
      return {
        ...state
      };
    default:
      return state;
  }
}
