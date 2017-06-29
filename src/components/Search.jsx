import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchInput, onChange }) =>
  <input
    className="search-input"
    type="text"
    name="search"
    placeholder="Search by keyword"
    value={searchInput}
    onChange={onChange}
  />;

Search.propTypes = {
  searchInput: PropTypes.string,
  onChange: PropTypes.func,
};

Search.defaultProps = {
  searchInput: '',
  onChange: '',
};

export default Search;
