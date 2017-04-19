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
 * @returns {ReactElement} containing repos that pass the filter
 */
const renderProjects = (projectData, searchInput, projectTags, projectWords) => {
  if (searchInput) {
    return projectData.filter((project) => {
      const keyWords = project.title.toLowerCase() + project.description.toLowerCase();
      const searchWords = searchInput.toLowerCase().split(' ');
      for (let i = 0; i < searchWords.length; i += 1) {
        if (keyWords.includes(searchWords[i])) { return true; }
      }
      return false;
    })
    .map((project, index) =>
      <Card
        project={project}
        tags={projectTags}
        words={projectWords[index]}
        key={project.full_name}
      />);
  }
  return projectData.map((project, index) =>
    <Card
      project={project}
      tags={projectTags}
      words={projectWords[index]}
      key={project.full_name}
    />);
};

const Main = ({ projectData, searchInput, projectTags, projectWords }) => (
  <main className="main">
    <div className="content-center">
      {/* <Navbar /> */}
      <div className="content-container">
        <div className="card-container">
          {projectData.length &&
            renderProjects(projectData, searchInput, projectTags, projectWords)
          }
        </div>
      </div>
    </div>
  </main>
);

Main.propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.object),
  projectTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchInput: PropTypes.string,
};

Main.defaultProps = {
  projectList: [],
  projectData: [],
  searchInput: '',
};

export default Main;
