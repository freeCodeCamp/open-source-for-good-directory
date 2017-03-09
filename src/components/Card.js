import React from 'react';

const Card = ({ project }) => (
  <div className="card">
    <div className="tags">
      <p>email-campaigns</p>
      <p>email</p>
    </div>
    <div className="card-content">
      <h1>{ project.title }</h1>
      <div className="icon-frame">
        <i className="fa fa-envelope-open-o fa-4x" aria-hidden="true" />
      </div>
      <h3>{ project.description }</h3>
      <a href={`https://github.com/${project.full_name}`}><button className="project-link">See Live Demo</button></a>
      <div className="project-status">
        <p>live</p>
        <p>{ project.full_name }</p>
        <p>
          <i className="fa fa-star fa-fw" aria-hidden="true" />
          { project.stargazer_count }
        </p>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  project: React.PropTypes.objectOf(React.PropTypes.shape),
};

Card.defaultProps = {
  project: {},
};

export default Card;
