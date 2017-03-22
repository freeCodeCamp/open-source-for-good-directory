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
   * @param {*} props comprehends all the props and actions defined below
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    /* check if user is logged in for card component creation */
    (function checkUser() {
      props.checkUser();
    }());
    /* populate state with data from github for every repo */
    (function getData() {
      props.projectList.map(project => props.getGithubData(project.full_name));
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
          projectList={this.props.projectList}
          isDev={this.props.isDev}
          searchInput={this.props.searchInput}
        />
      </div>
    );
  }
}

App.propTypes = {
  projectList: React.PropTypes.arrayOf(React.PropTypes.object),
  searchInput: React.PropTypes.string,
  isDev: React.PropTypes.bool,
  getGithubData: React.PropTypes.func,
  updateSearchInput: React.PropTypes.func,
  checkUser: React.PropTypes.func,
};

App.defaultProps = {
  projectList: [],
  searchInput: '',
  isDev: false,
  getGithubData: actions.getGithubData,
  updateSearchInput: actions.updateSearchInput,
  checkUser: actions.checkUser,
};

const mapStateToProps = state => ({
  projectList: state.projects.projectList,
  searchInput: state.search.input_value,
  isDev: state.projects.isDev,
});

App.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actions)(App);
