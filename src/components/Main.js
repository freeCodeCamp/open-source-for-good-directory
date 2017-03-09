import React from 'react';
import Navbar from './Navbar';
import Card from './Card';

const Main = ({ projectList }) => (
  <main className="main">
    <div className="content-center">
      <Navbar />
      <div className="content-container">
        <div className="card-container">
          { projectList.map(project => <Card project={project} key={project.full_name} />) }
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

export default Main;
