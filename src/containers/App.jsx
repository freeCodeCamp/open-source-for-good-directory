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
    return (
      <div className="app">
        <Header />
        <Banner />
        <Testimonial />
        <Search onChange={this.handleChange} searchInput={this.props.searchInput} />
        <Main
          projectData={this.props.projectData}
          projectTags={this.props.projectTags}
          projectWords={this.props.projectWords}
          searchInput={this.props.searchInput}
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
  searchInput: PropTypes.string,
  getGithubData: PropTypes.func,
  updateSearchInput: PropTypes.func,
};

App.defaultProps = {
  projectNames: [],
  projectData: [],
  projectTags: [],
  projectWords: [],
  searchInput: '',
  getGithubData: actions.getGithubData,
  updateSearchInput: actions.updateSearchInput,
};

const mapStateToProps = state => ({
  projectNames: state.projects.projectNames,
  projectData: state.projects.projectData,
  projectTags: state.projects.projectTags,
  projectWords: state.projects.projectWords,
  searchInput: state.search.input_value,
});

App.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actions)(App);
