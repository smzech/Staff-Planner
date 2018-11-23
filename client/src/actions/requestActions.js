import axios from 'axios';
import {
  GET_REQUESTS,
  REQUESTS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/types';

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
