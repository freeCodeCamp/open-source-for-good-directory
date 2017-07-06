import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTagFilter, removeTagFilter } from '../actions';

const Card = ({
  processTag,
  description,
  tagFilters,
  icon,
  issues,
  link,
  name,
  stars,
  subscribers,
  tags,
  title
}) => {
  const tagsArray = tags.map(tag =>
    <p
      key={`${name}-${tag}`}
      onClick={e => processTag(e)}
      style={{
        cursor: 'pointer',
        backgroundColor: tagFilters.includes(tag) ? 'pink' : '',
        userSelect: 'none'
      }}
      >
      {tag}
    </p>
  );
  return (
    <div className='card'>
      <div className='project-status'>
        <p>
          <i aria-hidden='true' className='fa fa-exclamation-triangle fa-fw' />
          {issues}
        </p>
        <p>
          <i aria-hidden='true' className='fa fa-eye fa-fw' />
          {subscribers}
        </p>
        <p>
          <i aria-hidden='true' className='fa fa-star fa-fw' />
          {stars}
        </p>
      </div>
      <div className='card-content'>
        <a className='project-link' href='#test'>
          <h1 className='project-title'>
            {title}
          </h1>
          <div className='icon-frame'>
            <i aria-hidden='true' className={`fa ${icon} fa-4x`} />
          </div>
          <h3 className='project-desc'>
            {description}
          </h3>
        </a>
        <a className='demo-link' href={link} target='_blank'>
          See Public Repo
        </a>
      </div>
      <div className='project-tags'>
        {tagsArray}
      </div>
    </div>
  );
};

Card.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.string,
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
    const tag = event.currentTarget.innerText;
    if (!ownProps.tagFilters.includes(tag)) {
      dispatch(addTagFilter(tag));
    } else {
      dispatch(removeTagFilter(tag));
    }
  }
});

export default connect(null, mapDispathcToProps)(Card);
