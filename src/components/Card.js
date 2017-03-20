import React from 'react';

const Card = ({ project, isDev }) => (
  <div className="card">
    <div className={isDev === false ? 'title green' : 'title brown'}>
      <h1>{ project.title }</h1>
    </div>
    {/* ternary operator to evaluate if should render normal card or dev card */}
    { isDev === false ?
      /* Normal View */
      <div className="card-content">
        <div className="icon-frame">
          <i className="fa fa-envelope-open-o fa-4x" aria-hidden="true" />
        </div>
        <h3>{ project.description }</h3>
        <a href={`https://github.com/${project.full_name}`}><button className="project-link">See Live Demo</button></a>
        <div className="project-status">
          <p>live</p>
          <p>{ project.full_name }</p>
          <p><i className="fa fa-star fa-fw" aria-hidden="true" />{ project.stargazer_count }</p>
        </div>
      </div>
      :
      /* Dev View */
      <div className="card-content">
        <div className="icon-frame">
          <i className="fa fa-envelope-open-o fa-4x" aria-hidden="true" />
        </div>
        <h3>{ project.description }</h3>
        <a href={`https://github.com/${project.full_name}`}><button className="project-link">See Repository on GitHub</button></a>
        <div className="project-status">
          <p><i className="fa fa-eye" aria-hidden="true" /> {this.state.data.subscribers_count}</p>
          <p>open issues: {this.state.data.open_issues}</p>
          <p><i className="fa fa-star fa-fw" aria-hidden="true" /> { project.stargazer_count }</p>
        </div>
      </div>
    }
  </div>
);

Card.propTypes = {
  project: React.PropTypes.objectOf(React.PropTypes.shape),
  isDev: React.PropTypes.bool,
};

Card.defaultProps = {
  project: {},
  isDev: false,
};

export default Card;
