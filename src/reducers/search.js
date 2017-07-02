import { UPDATE_SEARCH_INPUT } from '../actions';

const initialState = {
  inputValue: ''
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_INPUT:
      return {
        ...state,
        inputValue: action.inputValue
      };
    default:
      return state;
  }
}
