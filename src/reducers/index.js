import {
  REQUEST_REPO_DATA,
  RECEIVE_REPO_DATA,
  SET_SEARCH,
  ADD_TAG_FILTER,
  REMOVE_TAG_FILTER,
  SET_REPO_LIST,
  SET_SORT_BY,
  SET_USER
} from '../actions';

const initialState = {
  isDev: true,
  repos: [],
  search: '',
  sortBy: '+name',
  tagFilters: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_REPO_LIST:
      return {
        ...state,
        repos: action.repos.map(repo => {
          repo.isFetching = true;
          return repo;
        })
      };
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
            stars: action.stars,
            topics: action.topics,
            issues: action.issues,
            isFetching: false,
            watchers: action.watchers,
            subscribers: action.subscribers
          };
        }
        return repo;
      });
      return {
        ...state,
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
    case SET_USER:
      return {
        ...state,
        isDev: action.isDev
      };
    default:
      return state;
  }
}
