/* eslint-disable max-len */

import axios from 'axios';

/*
  Types
*/
export const GET_GITHUB_DATA = 'GET_GITHUB_DATA';
export const UPDATE_SEARCH_INPUT = 'UPDATE_SEARCH_INPUT';
export const CHECK_USER = 'CHECK_USER';

/*
  Actions
*/
export function updateSearchInput(value) {
  return {
    type: UPDATE_SEARCH_INPUT,
    inputValue: value
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

  const user = document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  return {
    type: CHECK_USER,
    isDev: !!user
  };
}

/*
  Async Actions
*/
export function getGithubData(repo, index) {
  return dispatch => {
    return axios(`https://api.github.com/repos/${repo}`)
      .then(response => {
        console.log(response);
        const githubData = {
          title: response.data.name.replace(/-/g, ' '),
          description:
            response.data.description || 'Project missing description',
          fullName: response.data.full_name,
          stargazerCount: response.data.stargazers_count,
          openIssues: response.data.open_issues,
          subscribersCount: response.data.subscribers_count,
          topics: index
        };
        dispatch({
          type: GET_GITHUB_DATA,
          githubData
        });
      })
      .catch(err => console.log(err));
  };
}
