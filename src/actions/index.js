/* eslint-disable max-len */

/*
  Types
*/
export const REQUEST_REPO_DATA = 'REQUEST_REPO_DATA';
export const RECEIVE_REPO_DATA = 'RECEIVE_REPO_DATA';
export const SET_SEARCH = 'SET_SEARCH';
export const CHECK_USER = 'CHECK_USER';

/*
  Actions
*/
export function setSearch(value) {
  return {
    type: SET_SEARCH,
    value
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

export function requestRepoData(repo) {
  return {
    type: REQUEST_REPO_DATA,
    repo
  };
}

export function receiveRepoData(repo, title, description, stars, topics) {
  return {
    type: RECEIVE_REPO_DATA,
    repo,
    title,
    description,
    stars,
    topics
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
        Accept: 'application/vnd.github.mercy-preview+json'
      })
    };
    return fetch(`https://api.github.com/repos/freecodecamp/${repo}`, options)
      .then(res => res.json())
      .then(data => {
        const title = data.name.replace(/-/g, ' ');
        const description = data.description || 'Project missing description';
        const stars = data.stargazers_count;
        const topics = data.topics;
        // const openIssues = data.open_issues;
        // const subscribersCount = data.subscribers_count;
        dispatch(receiveRepoData(repo, title, description, stars, topics));
      })
      .catch(err => console.log(err));
  };
}
