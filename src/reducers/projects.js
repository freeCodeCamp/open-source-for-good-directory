import * as actions from '../actions/types';

const initialState = {
  projectList: [
    {
      repo: 'freeCodeCamp/food-bank-app',
    },
    {
      repo: 'freeCodeCamp/Mail-for-Good',
    },
  ],
};

/**
 * display project information on card
 * @param {object} state where the info will be stored and passed to <Card /> component
 * @param {string} action string used to identify the function to use
 * @returns {object} updated state
 */
export default function projects(state = initialState, action) {
  switch (action.type) {
    case actions.GET_GITHUB_DATA:
      return Object.assign({}, state, {
        projectList: state.projectList.map((project) => {
          if (project.repo === action.full_name) {
            return Object.assign({}, project, action);
          }
          return Object.assign({}, project);
        }),
      });
    default:
      return state;
  }
}
