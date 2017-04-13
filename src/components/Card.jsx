import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ project, isDev }) => (
  <div className="card">
    { isDev === false ?
      /* Normal View */
      <div className="card-content">
        <a className="project-link" href="#test">
          <h1 className="project-title">{ project.title }</h1>
          <div className="icon-frame">
            <i className="fa fa-envelope-open-o fa-4x" aria-hidden="true" />
          </div>
          <h3 className="project-desc">{ project.description }</h3>
        </a>
        <a className="demo-link" href={`https://github.com/${project.full_name}`}>See Live Demo</a>
        <div className="project-status">
          <p>live</p>
          <p>{ project.full_name }</p>
          <p><i className="fa fa-star fa-fw" aria-hidden="true" />{ project.stargazer_count }</p>
        </div>
      </div>
      :
      /* Dev View */
      <div className="card-content">
        <a className="project-link" href="#test">
          <h1 className="project-title">{ project.title }</h1>
          <div className="icon-frame">
            <i className="fa fa-envelope-open-o fa-4x" aria-hidden="true" />
          </div>
          <h3 className="project-desc">{ project.description }</h3>
        </a>
        <a className="demo-link" href={`https://github.com/${project.full_name}`}>See Repository on GitHub</a>
        <div className="project-status">
          <p><i className="fa fa-eye" aria-hidden="true" /> {project.subscribers_count}</p>
          <p>open issues: {project.open_issues}</p>
          <p><i className="fa fa-star fa-fw" aria-hidden="true" /> { project.stargazer_count }</p>
        </div>
      </div>
    }
  </div>
);

Card.propTypes = {
  project: PropTypes.objectOf(PropTypes.shape),
  isDev: PropTypes.bool,
};

Card.defaultProps = {
  project: {},
  isDev: false,
};

export default Card;
