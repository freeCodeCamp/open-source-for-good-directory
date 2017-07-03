import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkUser, getGithubData, updateSearchInput } from '../actions';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import Search from '../components/Search';
import Main from '../components/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { checkUser, getGithubData, projectNames } = this.props;
    checkUser();
    projectNames.map((name, i) => getGithubData(name, i));
  }

  handleChange(e) {
    const value = e.target.value;
    this.props.updateSearchInput(value);
  }

  render() {
    const {
      projectData,
      projectTags,
      projectWords,
      projectIcons,
      searchInput,
      isDev
    } = this.props;
    return (
      <div className='app'>
        <Header />
        <Banner />
        <Testimonial />
        <Search onChange={this.handleChange} searchInput={searchInput} />
        <Main
          isDev={isDev}
          projectData={projectData}
          projectIcons={projectIcons}
          projectTags={projectTags}
          projectWords={projectWords}
          searchInput={searchInput}
        />
      </div>
    );
  }
}

App.propTypes = {
  checkUser: PropTypes.func,
  getGithubData: PropTypes.func,
  isDev: PropTypes.bool,
  projectData: PropTypes.arrayOf(PropTypes.object),
  projectIcons: PropTypes.arrayOf(PropTypes.string),
  projectNames: PropTypes.arrayOf(PropTypes.string),
  projectTags: PropTypes.arrayOf(PropTypes.string),
  projectWords: PropTypes.arrayOf(PropTypes.string),
  searchInput: PropTypes.string,
  updateSearchInput: PropTypes.func
};

App.defaultProps = {
  projectNames: [],
  projectData: [],
  projectTags: [],
  projectWords: [],
  projectIcons: [],
  searchInput: '',
  getGithubData: getGithubData,
  updateSearchInput: updateSearchInput,
  checkUser: checkUser,
  isDev: false
};

const mapStateToProps = state => {
  const { projects, search } = state;
  return {
    projectNames: projects.projectNames,
    projectData: projects.projectData,
    projectTags: projects.projectTags,
    projectWords: projects.projectWords,
    projectIcons: projects.projectIcons,
    searchInput: search.input_value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkUser: () => dispatch(checkUser()),
    getGithubData: (repo, index) => dispatch(getGithubData(repo, index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
