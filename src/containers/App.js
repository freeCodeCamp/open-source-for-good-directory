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
    (function getData() {
      props.projectList.map(project => props.getGithubData(project.full_name));
    }());
  }
  /** handle the input change event
   * @param {*} e the keyup event
   * @returns {string} user input
   */
  handleChange(e) {
    const value = e.target.value;
    const store = this.context.store;
    store.dispatch(this.props.updateSearchInput(value));
  }
  /**
   * this is our statefull render
   * @returns {objects} our stateless components
   */
  render() {
    return (
      <div className="app">
        <Header />
        <Banner />
        <Testimonial />
        <Search onChange={this.handleChange} searchInput={this.props.searchInput} />
        <Main projectList={this.props.projectList} />
      </div>
    );
  }
}

App.propTypes = {
  projectList: React.PropTypes.arrayOf(React.PropTypes.shape),
  searchInput: React.PropTypes.string,
  getGithubData: React.PropTypes.func,
  updateSearchInput: React.PropTypes.func,
};

App.defaultProps = {
  projectList: [],
  searchInput: '',
  getGithubData: actions.getGithubData,
  updateSearchInput: actions.updateSearchInput,
};

const mapStateToProps = state => ({
  projectList: state.projects.projectList,
  searchInput: state.search.input_value,
});

App.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actions)(App);
