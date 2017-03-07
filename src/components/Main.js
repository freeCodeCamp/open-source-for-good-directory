import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Card from './Card';

const Main = ({ projectList }) => (
  <main className="main">
    <div className="content-center">
      <Navbar />
      <div className="content-container">
        <div className="card-container">
          { projectList.map(project => <Card props={project} key={project.repo} />) }
        </div>
      </div>
    </div>
  </main>
);

Main.propTypes = {
  projectList: React.PropTypes.arrayOf(React.PropTypes.shape),
};

Main.defaultProps = {
  projectList: [],
};

const mapStateToProps = state => ({
  projectList: state.projects.projectList,
});

export default connect(mapStateToProps)(Main);
