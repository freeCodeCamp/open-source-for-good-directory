import { GET_GITHUB_DATA, CHECK_USER } from '../actions';

const initialState = {
  projectNames: [
    'freeCodeCamp/Pantry-for-Good',
    'freeCodeCamp/Mail-for-Good',
    'freeCodeCamp/Conference-for-Good',
    'freeCodeCamp/LetsMeet'
  ],
  projectTags: [
    'email',
    'marketing',
    'automation',
    'finance',
    'inventory',
    'service'
  ],
  projectWords: ['034', '135', '34', '201'],
  projectIcons: ['fa-free-code-camp', 'fa-envelope-o', 'fa-cubes', 'fa-globe'],
  projectData: [],
  isDev: false
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case GET_GITHUB_DATA: {
      const newProjectData = state.projectData.slice();
      newProjectData.push(action.githubData);
      return { ...state, projectData: newProjectData };
    }
    case CHECK_USER:
      return { ...state, isDev: action.isDev };
    default:
      return state;
  }
}
