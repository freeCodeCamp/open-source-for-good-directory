import { combineReducers } from 'redux';

const projects = (state = [], action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const search = (state = '', action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const selection = (state = 0, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default combineReducers({ projects, search, selection });
