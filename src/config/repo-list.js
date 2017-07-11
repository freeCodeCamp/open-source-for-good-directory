/*
  List of Repos to be included in the Directory
  INSTRUCTIONS:
  Please keep this file ALPHABETICALLY SORTED by repo name
  EVERYTHING should be in lower case. Really important for Search Functionality
  name: Github Repo name in lower case (without the preceeding freecodecamp/)
  icon: Image to be displayed in the Project's Card. The string contains a
        Font Awesome Icon calss. Choose yours in http://fontawesome.io/icons/
  tags: tags to be shown if the user is not authenticated (for NonProfits)
  status: Choose between 'dev' and 'prod'. Projects in 'dev' won't be
          displayed to NonProfits.
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
