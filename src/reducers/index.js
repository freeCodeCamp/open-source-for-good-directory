import { REQUEST_REPO_DATA, RECEIVE_REPO_DATA, SET_SEARCH } from '../actions';
import repoList from '../config/repo-list';

const initialState = {
  isDev: true,
  isFetching: false,
  repos: repoList,
  search: ''
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
            stars: Number(action.stars)
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
    default:
      return state;
  }
}
