import React from 'react';
import PropTypes from 'prop-types';
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
   * @param {*} props comprehends all the props and actions defined below
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    /* populate state with data from github for every repo */
    (function getData() {
      props.projectNames.map(name => props.getGithubData(name));
    }());
    /* check if user is logged in for card component creation */
    (function checkUser() {
      props.checkUser();
    }());
  }
  /** handle the input change event
   * @param {*} e the keyup event
   * @return {string} user input
   */
  handleChange(e) {
    const value = e.target.value;
    const store = this.context.store;
    store.dispatch(this.props.updateSearchInput(value));
  }
  /**
   * this is our statefull render
   * @return {objects} our stateless components
   */
  render() {
    const { projectData, projectTags, projectWords, projectIcons, searchInput, isDev } = this.props;
    return (
      <div className="app">
        <Header />
        <Banner />
        <Testimonial />
        <Search onChange={this.handleChange} searchInput={searchInput} />
        <Main
          projectData={projectData}
          projectTags={projectTags}
          projectWords={projectWords}
          projectIcons={projectIcons}
          searchInput={searchInput}
          isDev={isDev}
        />
      </div>
    );
  }
}

App.propTypes = {
  projectNames: PropTypes.arrayOf(PropTypes.string),
  projectData: PropTypes.arrayOf(PropTypes.object),
  projectTags: PropTypes.arrayOf(PropTypes.string),
  projectWords: PropTypes.arrayOf(PropTypes.string),
  projectIcons: PropTypes.arrayOf(PropTypes.string),
  isDev: PropTypes.bool,
  searchInput: PropTypes.string,
  getGithubData: PropTypes.func,
  updateSearchInput: PropTypes.func,
  checkUser: PropTypes.func,
};

App.defaultProps = {
  projectNames: [],
  projectData: [],
  projectTags: [],
  projectWords: [],
  projectIcons: [],
  searchInput: '',
  getGithubData: actions.getGithubData,
  updateSearchInput: actions.updateSearchInput,
  checkUser: actions.checkUser,
  isDev: false,
};

const mapStateToProps = (state) => {
  const { projects, search } = state;
  return {
    projectNames: projects.projectNames,
    projectData: projects.projectData,
    projectTags: projects.projectTags,
    projectWords: projects.projectWords,
    projectIcons: projects.projectIcons,
    searchInput: search.input_value,
  };
};

App.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actions)(App);
