/*
  List of Repos to be included in the Directory
  INSTRUCTIONS:
  Please keep this file ALPHABETICALLY SORTED by repo name
  EVERYTHING should be in lower case. Really important for Search Functionality
  name: Github Repo name in lower case (without the preceeding freecodecamp/)
  icon: Font Awesome Icon CSS Class Name http://fontawesome.io/icons/
  status: Choose betwwen "dev" and "prod"
*/

const repoList = [
  {
    name: 'conference-for-good',
    icon: 'fa-users',
    tags: ['finnance', 'service'],
    status: 'prod'
  },
  {
    name: 'mail-for-good',
    icon: 'fa-envelope-o',
    tags: ['email', 'marketing', 'finnance' ],
    status: 'prod'
  },
  {
    name: 'meeting-for-good',
    icon: 'fa-globe',
    tags: ['meeting', 'coordination'],
    status: 'prod'
  },
  {
    name: 'open-source-for-good-directory',
    icon: 'fa-folder-open-o',
    tags: ['meeting', 'coordination'],
    status: 'prod'
  },
  {
    name: 'pantry-for-good',
    icon: 'fa-cutlery',
    tags: ['email', 'finnance', 'inventory'],
    status: 'prod'
  }
];

export default repoList;
