import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser, fetchGithubData, setSearch, setSortBy } from '../actions';
import Header from '../components/Header';
import Title from '../components/Title';
import Testimonial from '../components/Testimonial';
import Search from '../components/Search';
import SortMenu from '../components/SortMenu';
import Main from '../components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  componentDidMount() {
    const { fetchGithubData, repos } = this.props;
    repos.map(repo => fetchGithubData(repo.name));
    this.checkUser();
  }

  checkUser() {
    const isDev = (/(;\s+|^)userId=.+/g).test(document.cookie);
    this.props.setUser(isDev);
  }

  handleChange(e) {
    const value = e.target.value;
    this.props.setSearch(value);
  }

  handleSort(e) {
    const mode = e.currentTarget.value;
    this.props.setSortBy(mode);
  }

  render() {
    const { isDev, isFetching, repos, search, sortBy, tagFilters } = this.props;
    return (
      <div className='app'>
        <Header />
        <Title />
        <div className='search-bar'>
          <Search onChange={this.handleChange} search={search} />
           {/*<SortMenu setSortBy={this.handleSort} />*/}
        </div>
        <Main
          isDev={isDev}
          isFetching={isFetching}
          repos={repos}
          search={search}
          sortBy={sortBy}
          tagFilters={tagFilters}
        />
        <Testimonial />
      </div>
    );
  }
}

App.propTypes = {
  checkUser: PropTypes.func,
  fetchGithubData: PropTypes.func,
  isDev: PropTypes.bool,
  isFetching: PropTypes.bool,
  repos: PropTypes.array,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  setSortBy: PropTypes.func,
  setUser: PropTypes.func,
  sortBy: PropTypes.string,
  tagFilters: PropTypes.array
};

const mapStateToProps = state => {
  const { isDev, isFetching, repos, search, sortBy, tagFilters } = state;
  return {
    isDev,
    isFetching,
    repos,
    search,
    sortBy,
    tagFilters
  };
};

const mapDispatchToProps = dispatch => ({
  fetchGithubData: repo => dispatch(fetchGithubData(repo)),
  setSearch: value => dispatch(setSearch(value)),
  setSortBy: mode => dispatch(setSortBy(mode)),
  setUser: isDev => dispatch(setUser(isDev))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
