import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const Main = ({ isDev, repos, search, sortBy, tagFilters }) => {
  const cardsArray = repos
    // Search Filter
    .filter(repo => {
      if (search) {
        const lowCaseSearch = search.toLowerCase();
        const descWords = repo.description.split(/(\s|\. )/g);
        return (
          repo.name.includes(lowCaseSearch) ||
          (isDev
            ? repo.topics.some(topic => topic.includes(lowCaseSearch))
            : repo.tags.some(tag => tag.includes(lowCaseSearch))) ||
          descWords.some(word => word.includes(lowCaseSearch))
        );
      }
      return true;
    })
    // Tags Filter
    .filter(repo => {
      const tagsOrTopics = isDev ? 'topics' : 'tags';
      return tagFilters.every(elem => repo[tagsOrTopics].indexOf(elem) > -1);
    })
    // isDev Filter
    .filter(repo => {
      if (!isDev && repo.status === 'dev') {
        return false;
      }
      return true;
    })
    // Only Show Repo if it has data
    .filter(repo => !repo.isFetching)
    .sort((repoA, repoB) => {
      // Symbol '+' or '-'
      const direction = sortBy[0];
      // Repo Property: 'name' or 'stars'
      const val = sortBy.slice(1);
      if (direction === '+') {
        return repoA[val] > repoB[val];
      }
      return repoA[val] < repoB[val];
    })
    .map(repo => {
      const repoLink = `https://github.com/freecodecamp/${repo.name}`;

      return (
        <Card
          description={repo.description}
          icon={repo.icon}
          isDev={isDev}
          issues={repo.issues}
          key={`card-${repo.name}`}
          link={isDev ? repoLink : `${repo.name}`}
          name={repo.name}
          stars={repo.stars}
          subscribers={repo.subscribers}
          tagFilters={tagFilters}
          tags={isDev && repo.topics ? repo.topics : repo.tags}
          title={repo.title}
        />
      );
    });

  const spinner = <i className='fa fa-cog fa-spin fa-5x fa-fw' />;
  const areFetching = repos.every(repo => repo.isFetching);

  return (
    <main className='main'>
      <div className='content-center'>
        <div className='content-container'>
          <div className='card-container'>
            {areFetching ? spinner : cardsArray}
          </div>
        </div>
      </div>
    </main>
  );
};

Main.propTypes = {
  isDev: PropTypes.bool,
  repos: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  sortBy: PropTypes.string,
  tagFilters: PropTypes.arrayOf(PropTypes.string)
};

export default Main;
