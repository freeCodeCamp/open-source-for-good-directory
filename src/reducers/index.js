import { combineReducers } from 'redux';
import projects from './projects';
import search from './search';

export default combineReducers({ projects, search });
