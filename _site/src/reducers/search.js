import * as actions from '../actions/types';

const initialState = {
  input_value: '',
};

/**
 * get value from search input
 * @param {object} state stores our value
 * @param {*} action updates the state on value change
 * @returns {object} updated state
 */
export default function search(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_SEARCH_INPUT:
      return {
        ...state,
        input_value: action.input_value,
      };
    default:
      return state;
  }
}
