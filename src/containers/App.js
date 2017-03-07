import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import Search from '../components/Search';
import Main from '../components/Main';

/**
 * this container is defined as class so we can modify state
 */
class App extends React.Component {
  /**
   * @param {*} props comprehends the array list of projects and the API call func
   */
  constructor(props) {
    super(props);
    (function asd() {
      props.projectList.map(project => props.getGithubData(project.repo));
    }());
  }
  /**
   * this is render?
   * @returns {objects} our stateless components
   */
  render() {
    return (
      <div className="app">
        <Header />
        <Banner />
        <Testimonial />
        <Search />
        <Main />
      </div>
    );
  }
}

App.propTypes = {
  projectList: React.PropTypes.arrayOf(React.PropTypes.shape),
  getGithubData: React.PropTypes.func,
};

App.defaultProps = {
  projectList: [],
  getGithubData: actions.getGithubData,
};

const mapStateToProps = state => ({
  projectList: state.projects.projectList,
});

export default connect(mapStateToProps, actions)(App);
