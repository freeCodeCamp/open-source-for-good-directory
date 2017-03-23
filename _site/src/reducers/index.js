import { combineReducers } from 'redux';
import projects from './projects';
import search from './search';

const selection = (state = 0, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ projects, search, selection });
