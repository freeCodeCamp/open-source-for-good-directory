import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import Search from '../components/Search';
import Main from '../components/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    /* populate state with data from github for every repo */
    (function getData() {
      props.projectNames.map((name, i) => props.getGithubData(name, i));
    })();
    /* check if user is logged in for card component creation */
    (function checkUser() {
      props.checkUser();
    })();
  }

  handleChange(e) {
    const value = e.target.value;
    const store = this.context.store;
    store.dispatch(this.props.updateSearchInput(value));
  }

  render() {
    const {
      projectData,
      projectTags,
      projectWords,
      projectIcons,
      searchInput,
      isDev,
    } = this.props;
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

App.contextTypes = {
  store: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
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

export default connect(mapStateToProps, actions)(App);

// Another Test 0