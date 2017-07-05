import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const Main = ({ isDev, isFetching, repos, search, sortBy, tagFilters }) => {
  const cardsArray = repos
    // Search Filter
    .filter(repo => {
      // IMPROVE SEARCH SYSTEM
      return repo.name.includes(search);
    })
    // Tags Filter
    .filter(repo => {
      const tagsOrTopics = isDev ? 'topics' : 'tags';
      return tagFilters.every(elem => repo[tagsOrTopics].indexOf(elem) > -1);
    })
    .sort((repoA, repoB) => {
      // Symbol '+' or '-'
      const dir = sortBy[0];
      // Repo Property: 'name' or 'stars'
      const val = sortBy.slice(1);
      if (dir === '+') {
        return repoA[val] > repoB[val];
      } else {
        return repoA[val] < repoB[val];
      }
    })
    .map(repo => {
      const nonProfitLink =
        process.env === 'production'
          ? `${repo.name}`
          : `../../docs/${repo.name}`;

      const repoLink = `https://github.com/freecodecamp/${repo.name}`;

      return (
        <Card
          description={repo.description}
          icon={repo.icon}
          key={`card-${repo.name}`}
          link={isDev ? repoLink : nonProfitLink}
          name={repo.name}
          stars={repo.stars}
          tagFilters={tagFilters}
          tags={isDev && repo.topics ? repo.topics : repo.tags}
          title={repo.title}
        />
      );
    });

  const spinner = <i className='fa fa-cog fa-spin fa-5x fa-fw' />;

  return (
    <main className='main'>
      <div className='content-center'>
        <div className='content-container'>
          <div className='card-container'>
            {isFetching ? spinner : cardsArray}
          </div>
        </div>
      </div>
    </main>
  );
};

Main.propTypes = {
  isDev: PropTypes.bool,
  isFetching: PropTypes.bool,
  repos: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  sortBy: PropTypes.string,
  tagFilters: PropTypes.arrayOf(PropTypes.string)
};

export default Main;
