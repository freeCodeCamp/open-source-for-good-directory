import React from 'react';

const Search = ({ searchInput, onChange }) => (
  <input className="search-input" type="text" name="search" placeholder="Filter projects" value={searchInput} onChange={onChange} />
);

Search.propTypes = {
  searchInput: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

Search.defaultProps = {
  searchInput: '',
  onChange: '',
};

export default Search;
