import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

const renderProjects = (
  projectData,
  searchInput,
  projectTags,
  projectWords,
  projectIcons,
  isDev,
) => {
  if (searchInput) {
    return projectData
      .filter(project => {
        const wordsArray = project.title.toLowerCase().split(' ');
        projectWords[project.topics].split('').forEach(j => {
          wordsArray.push(projectTags[j]);
        });
        const keyWords = wordsArray.join(' ');
        // if searchInput has more than one string in it we remove every empty one
        const searchWords =
          searchInput.split(' ').length > 1
            ? searchInput.toLowerCase().split(' ').filter(Boolean)
            : searchInput.toLowerCase().split(' ');
        for (let k = 0; k < searchWords.length; k += 1) {
          if (keyWords.includes(searchWords[k])) {
            return true;
          }
        }
        return false;
      })
      .map(project =>
        <Card
          project={project}
          tags={projectTags}
          words={projectWords[project.topics]}
          icon={projectIcons[project.topics]}
          key={project.full_name}
          isDev={isDev}
        />,
      );
  }
  return projectData.map(project =>
    <Card
      project={project}
      tags={projectTags}
      words={projectWords[project.topics]}
      icon={projectIcons[project.topics]}
      key={project.full_name}
      isDev={isDev}
    />,
  );
};

const Main = ({
  projectData,
  searchInput,
  projectTags,
  projectWords,
  projectIcons,
  isDev,
}) =>
  <main className="main">
    <div className="content-center">
      {/* <Navbar /> */}
      <div className="content-container">
        <div className="card-container">
          {projectData.length &&
            renderProjects(
              projectData,
              searchInput,
              projectTags,
              projectWords,
              projectIcons,
              isDev,
            )}
        </div>
      </div>
    </div>
  </main>;

Main.propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectIcons: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchInput: PropTypes.string.isRequired,
  isDev: PropTypes.bool.isRequired,
};

export default Main;
