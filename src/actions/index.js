import axios from 'axios';

import {
  GET_GITHUB_DATA,
  UPDATE_SEARCH_INPUT,
  CHECK_USER,
} from './types';

export function getGithubData(repo, index) {
  return dispatch => axios.get(`https://api.github.com/repos/${repo}`)
    .then((response) => {
      const githubData = {
        title: response.data.name.replace(/-/g, ' '),
        description: response.data.description || 'Project missing description',
        full_name: response.data.full_name,
        stargazer_count: response.data.stargazers_count,
        open_issues: response.data.open_issues,
        subscribers_count: response.data.subscribers_count,
        topics: index,
      };
      dispatch({
        type: GET_GITHUB_DATA,
        githubData,
      });
    });
}

export function updateSearchInput(value) {
  return {
    type: UPDATE_SEARCH_INPUT,
    input_value: value,
  };
}

export function checkUser() {
  /*
  if (document.cookie.length) {
    const cookieArray = document.cookie.split(';');
    const cookieObj = cookieArray.reduce((prev, curr) => {
      const currProp = curr.split('=');
      const key = currProp[0];
      const value = currProp[1];
      return Object.assign(prev, { key: value });
    }, {});
  }
  */

  const user = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  return {
    type: CHECK_USER,
    isDev: !!(user),
  };
}
