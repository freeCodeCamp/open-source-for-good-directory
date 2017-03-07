import { combineReducers } from 'redux';
import projects from './projects';

const search = (state = '', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selection = (state = 0, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ projects, search, selection });
