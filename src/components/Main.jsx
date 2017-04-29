import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

/**
 * renders all the <Card /> elements by default, if user uses the search bar it filters the results
 * inclusively -> meaning that a string "oo ee" will display both projects "book" and "eel"
 * @param {Array} projectData containing all the repos data from Github
 * filter the title and description key value as a string against
 * @param {String} searchInput the search input submitted by the user, array of substrings
 * both values are normalized with toLowerCase() for better filtering
 * @param {Array} projectTags contains an array of tags that can be used by projects
 * @param {Array} projectWords array of "filters" for every project to define what tags they can use
 * @param {Array} projectIcons array of icons for cards
 * @param {Boolean} isDev True if user has freeCodeCamp cookie in browser, else false
 * @returns {ReactElement} containing repos that pass the filter
 */
const renderProjects = (
    projectData, searchInput, projectTags,
    projectWords, projectIcons, isDev,
  ) => {
    // [1, 2, 3, 4] => [1, 3] => [1, 2];
  if (searchInput) {
    return projectData.filter((project, i) => {
      const wordsArray = project.title.toLowerCase().split(' ');
      projectWords[i].split('').forEach((j) => {
        wordsArray.push(projectTags[j]);
      });
      const keyWords = wordsArray.join(' ');
      // if searchInput has more than one string in it we remove every empty one
      const searchWords = (searchInput.split(' ').length > 1) ?
      searchInput.toLowerCase().split(' ').filter(Boolean) :
      searchInput.toLowerCase().split(' ');
      for (let k = 0; k < searchWords.length; k += 1) {
        if (keyWords.includes(searchWords[k])) {
          return true;
        }
      }
      return false;
    })
    .map((project, index) =>
      <Card
        project={project}
        tags={projectTags}
        words={projectWords[index]}
        icon={projectIcons[index]}
        key={project.full_name}
        isDev={isDev}
      />);
  }
  return projectData.map((project, index) =>
    <Card
      project={project}
      tags={projectTags}
      words={projectWords[index]}
      icon={projectIcons[index]}
      key={project.full_name}
      isDev={isDev}
    />);
};

const Main = ({ projectData, searchInput, projectTags, projectWords, projectIcons, isDev }) => (
  <main className="main">
    <div className="content-center">
      {/* <Navbar /> */}
      <div className="content-container">
        <div className="card-container">
          {projectData.length &&
            renderProjects(projectData, searchInput, projectTags, projectWords, projectIcons, isDev)
          }
        </div>
      </div>
    </div>
  </main>
);

Main.propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectIcons: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchInput: PropTypes.string.isRequired,
  isDev: PropTypes.bool.isRequired,
};

export default Main;
