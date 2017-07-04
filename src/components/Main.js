import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const Main = ({ isDev, isFetching, repos, search }) => {
  const cardsArray = repos
    .filter(repo => {
      // IMPROVE SEARCH SYSTEM
      return repo.name.includes(search);
    })
    .map(repo =>
      <Card
        description={repo.description}
        icon={repo.icon}
        key={`card-${repo.name}`}
        link={
          isDev
            ? `https://github.com/freecodecamp/${repo.name}`
            : `${repo.name}`
        }
        name={repo.name}
        stars={repo.stars}
        tags={isDev && repo.topics ? repo.topics : repo.tags}
        title={repo.title}
      />
    );

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
  search: PropTypes.string.isRequired
};

export default Main;
