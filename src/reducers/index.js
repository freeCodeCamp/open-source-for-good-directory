import {
  REQUEST_REPO_DATA,
  RECEIVE_REPO_DATA,
  SET_SEARCH,
  ADD_TAG_FILTER,
  REMOVE_TAG_FILTER,
  SET_SORT_BY
} from '../actions';
import repoList from '../config/repo-list';

const initialState = {
  isDev: true,
  isFetching: false,
  repos: repoList,
  search: '',
  sortBy: '+name',
  tagFilters: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_REPO_DATA:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_REPO_DATA:
      const newRepos = state.repos.map(repo => {
        if (repo.name === action.repo) {
          return {
            ...repo,
            title: action.title,
            description: action.description,
            stars: Number(action.stars),
            topics: action.topics
          };
        }
        return repo;
      });
      return {
        ...state,
        isFetching: false,
        repos: newRepos
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.value
      };
    case ADD_TAG_FILTER:
      return {
        ...state,
        tagFilters: [...state.tagFilters, action.tag]
      };
    case REMOVE_TAG_FILTER:
      return {
        ...state,
        tagFilters: state.tagFilters.filter(tag => {
          return tag !== action.tag;
        })
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.mode
      };
    default:
      return state;
  }
}
