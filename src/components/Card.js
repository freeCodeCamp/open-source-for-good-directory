import React from 'react';
import { connect } from 'react-redux';

const Card = ({ props }) => (
  <div className="card">
    <div className="tags">
      <p>email-campaigns</p>
      <p>email</p>
    </div>
    <div className="card-content">
      <h1>{ props.title }</h1>
      <div className="icon-frame">
        <i className="fa fa-envelope-open-o fa-4x" aria-hidden="true" />
      </div>
      <h3>{ props.description }</h3>
      <a href={`https://github.com/${props.full_name}`}><button className="project-link">See Live Demo</button></a>
      <div className="project-status">
        <p>live</p>
        <p>{ props.full_name }</p>
        <p>
          <i className="fa fa-star fa-fw" aria-hidden="true" />
          { props.stargazer_count }
        </p>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  props: React.PropTypes.objectOf(React.PropTypes.shape),
  full_name: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  stargazer_count: React.PropTypes.number,
};

Card.defaultProps = {
  props: {},
  full_name: '',
  title: '',
  description: '',
  stargazer_count: 0,
};

export default connect()(Card);
