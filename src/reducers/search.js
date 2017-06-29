import * as actions from '../actions/types';

const initialState = {
  input_value: '',
};

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
