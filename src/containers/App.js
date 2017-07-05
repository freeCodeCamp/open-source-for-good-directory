import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkUser, fetchGithubData, setSearch } from '../actions';
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
    const { checkUser, fetchGithubData, repos } = this.props;
    checkUser();
    repos.map(repo => fetchGithubData(repo.name));
  }

  handleChange(e) {
    const value = e.target.value;
    this.props.setSearch(value);
  }

  render() {
    const { isDev, isFetching, repos, search, tagFilters } = this.props;
    return (
      <div className='app'>
        <Header />
        <Banner />
        <Testimonial />
        <Search onChange={this.handleChange} search={search} />
        <Main
          isDev={isDev}
          isFetching={isFetching}
          repos={repos}
          search={search}
          tagFilters={tagFilters}
        />
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
  tagFilters: PropTypes.array
};

const mapStateToProps = state => {
  const { isDev, isFetching, repos, search, tagFilters } = state;
  return {
    isDev,
    isFetching,
    repos,
    search,
    tagFilters
  };
};

const mapDispatchToProps = dispatch => ({
  checkUser: () => dispatch(checkUser()),
  fetchGithubData: repo => dispatch(fetchGithubData(repo)),
  setSearch: value => dispatch(setSearch(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
