import * as actions from '../actions/types';

const initialState = {
  projectList: [
    {
      full_name: 'freeCodeCamp/food-bank-app',
    },
    {
      full_name: 'freeCodeCamp/Mail-for-Good',
    },
    {
      full_name: 'freeCodeCamp/Conference-for-Good',
    },
    {
      full_name: 'freeCodeCamp/LetsMeet',
    },
  ],
};

/**
 * display project information on card
 * @param {object} state where the info will be stored and passed to <Card /> component
 * @param {string} action string used to identify the function to use
 * @return {object} updated state
 */
export default function projects(state = initialState, action) {
  switch (action.type) {
    case actions.GET_GITHUB_DATA:
      return {
        ...state,
        projectList: state.projectList.map((project) => {
          if (project.full_name === action.githubData.full_name) {
            return { ...project,
              githubData: action.githubData };
          }
          return { ...project };
        }),
      };
    case actions.CHECK_USER:
      return { ...state,
        isDev: action.isDev };
    default:
      return state;
  }
}
