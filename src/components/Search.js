import React from 'react';
import PropTypes from 'prop-types';

const clearSearch = (e, onChange) => {
  if (e.key === 'Escape') {
    e.target.value = '';
    onChange(e);
  }
};

const Search = ({ search, onChange }) =>
  <input
    className='search-input'
    name='search'
    onChange={onChange}
    onKeyDown={(e) => clearSearch(e, onChange)}
    placeholder='Search by keyword'
    type='text'
    value={search}
  />;

Search.propTypes = {
  onChange: PropTypes.func,
  search: PropTypes.string
};

Search.defaultProps = {
  search: '',
  onChange: ''
};

export default Search;
