import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTagFilter, removeTagFilter } from '../actions';

const Card = ({
  processTag,
  description,
  tagFilters,
  icon,
  isDev,
  issues,
  link,
  name,
  stars,
  subscribers,
  tags,
  title
}) => {
  const tagsArray = tags.map(tag => {
    const included = tagFilters.includes(tag);
    return (
      <p
        key={`${name}-${tag}`}
        onClick={e => processTag(e)}
        style={{
          cursor: 'pointer',
          backgroundColor: included ? '#FF6D58' : null,
          color: included ? 'white' : null,
          fontWeight: included ? 700 : '',
          userSelect: 'none'
        }}
        >
        {tag}
      </p>
    );
  });
  return (
    <div className='card' title={title}>
      <div className='project-status'>
        <a
          href={link}
          target={isDev ? '_blank' : ''}
          >
          <p title='Stars'>
            <i aria-hidden='true' className='fa fa-star fa-fw' />
            {stars}
          </p>
        </a>
        <a
          href={link}
          target={isDev ? '_blank' : ''}
          >
          <p title={isDev ? 'Watching' : 'Subscribers'}>
            <i aria-hidden='true' className='fa fa-eye fa-fw' />
            {subscribers}
          </p>
        </a>
        {isDev
          ? <a href={`${link}/issues`} target='_blank'>
              <p title='Open Issues'>
                <i aria-hidden='true' className='fa fa-github fa-fw git-icon' />
                {issues}
              </p>
            </a>
          : null}
      </div>
      <a className='project-link' href={link} target={isDev ? '_blank' : ''}>
        <div className='card-content'>
          <div className='project-title'>
            <h2>
              {title}
            </h2>
          </div>
          <div className='icon-frame'>
            <i aria-hidden='true' className={`fa ${icon} fa-4x`} />
          </div>
          <div className='project-desc'>
            <p>
              {description}
            </p>
          </div>
        </div>
      </a>
      <hr className='project-divider' />
      <div className='project-tags'>
        {tagsArray}
      </div>
    </div>
  );
};

Card.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.string,
  isDev: PropTypes.bool,
  issues: PropTypes.number,
  link: PropTypes.string,
  name: PropTypes.string,
  processTag: PropTypes.func,
  stars: PropTypes.number,
  subscribers: PropTypes.number,
  tagFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string
};

const mapDispathcToProps = (dispatch, ownProps) => ({
  processTag: event => {
    event.preventDefault();
    const tag = event.currentTarget.innerText;
    if (!ownProps.tagFilters.includes(tag)) {
      dispatch(addTagFilter(tag));
    } else {
      dispatch(removeTagFilter(tag));
    }
  }
});

export default connect(null, mapDispathcToProps)(Card);
