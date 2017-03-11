import React from 'react';
// import Navbar from './Navbar';
import Card from './Card';

const Main = ({ projectList, searchInput }) => (
  <main className="main">
    <div className="content-center">
      {/* <Navbar /> */}
      <div className="content-container">
        <div className="card-container">
          { /**
           * takes @param {array} projectList containing all the repos
           * filter the key value @param {string} project.full_name with
           * @param {string} searchInput the search input submitted by the user
           * both strings are normalized with toLowerCase() for better filtering
           * @returns {array} containing repos that pass the filter
           * to be used to map the <Card /> components
           */
            projectList.filter(project =>
            ~project.full_name.replace(/-/g, ' ').toLowerCase().indexOf(searchInput.toLowerCase())).map(project =>
              <Card project={project.githubData} key={project.full_name} />)
          }
        </div>
      </div>
    </div>
  </main>
);

Main.propTypes = {
  projectList: React.PropTypes.arrayOf(React.PropTypes.shape),
  searchInput: React.PropTypes.string,
};

Main.defaultProps = {
  projectList: [],
  searchInput: '',
};

export default Main;
