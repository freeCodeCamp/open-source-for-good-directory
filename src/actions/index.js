/* eslint-disable max-len */
import { formatRepoTitle } from '../helpers';

/*
  Types
*/
export const SET_REPO_LIST = 'SET_REPO_LIST';
export const REQUEST_REPO_DATA = 'REQUEST_REPO_DATA';
export const RECEIVE_REPO_DATA = 'RECEIVE_REPO_DATA';
export const SET_SEARCH = 'SET_SEARCH';
export const CHECK_USER = 'CHECK_USER';
export const ADD_TAG_FILTER = 'ADD_TAG_FILTER';
export const REMOVE_TAG_FILTER = 'REMOVE_TAG_FILTER';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_USER = 'SET_USER';

/*
  Actions
*/
export function setRepoList(repos) {
  return {
    type: SET_REPO_LIST,
    repos
  };
}

export function requestRepoData(repo) {
  return {
    type: REQUEST_REPO_DATA,
    repo: {
      isFetching: true,
      ...repo
    }
  };
}

export function receiveRepoData(
  repo,
  title,
  description,
  stars,
  topics,
  issues,
  subscribers
) {
  return {
    type: RECEIVE_REPO_DATA,
    repo,
    title,
    description,
    stars,
    topics,
    issues,
    subscribers
  };
}

export function setSearch(value) {
  return {
    type: SET_SEARCH,
    value
  };
}

export function setUser(isDev) {
  return {
    type: SET_USER,
    isDev
  };
}

export function addTagFilter(tag) {
  return {
    type: ADD_TAG_FILTER,
    tag
  };
}

export function removeTagFilter(tag) {
  return {
    type: REMOVE_TAG_FILTER,
    tag
  };
}

export function setSortBy(mode) {
  return {
    type: SET_SORT_BY,
    mode
  };
}

/*
  Async Actions
*/
export function fetchGithubData(repo) {
  return dispatch => {
    dispatch(requestRepoData(repo));
    const options = {
      headers: new Headers({
        // To get Github topics
        Accept: 'application/vnd.github.mercy-preview+json'
      })
    };
    return fetch(`https://api.github.com/repos/freecodecamp/${repo}`, options)
      .then(res => res.json())
      .then(data => {
        const title = formatRepoTitle(data.name);
        const description = data.description || 'Project missing description';
        const stars = Number(data.stargazers_count);
        const topics = data.topics;
        const issues = Number(data.open_issues);
        const subscribers = Number(data.subscribers_count);
        dispatch(
          receiveRepoData(
            repo,
            title,
            description,
            stars,
            topics,
            issues,
            subscribers
          )
        );
      })
      .catch(err => console.log(err));
  };
}
