import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchInput, onChange }) =>
  <input
    className='search-input'
    name='search'
    onChange={onChange}
    placeholder='Search by keyword'
    type='text'
    value={searchInput}
  />;

Search.propTypes = {
  onChange: PropTypes.func,
  searchInput: PropTypes.string
};

Search.defaultProps = {
  searchInput: '',
  onChange: ''
};

export default Search;
