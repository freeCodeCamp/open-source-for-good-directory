import React from 'react';
import PropTypes from 'prop-types';

const SortMenu = ({ setSortBy }) =>
  (<form>
    <select onChange={setSortBy}>
      <option value='+name'> Name Asc </option>
      <option value='-name'>Name Desc</option>
      <option value='+stars'>Stars Asc</option>
      <option value='-stars'>Stars Desc</option>
      <option value='+subscribers'>Watching Asc</option>
      <option value='-subscribers'>Watching Desc</option>
      <option value='+issues'>Issues Asc</option>
      <option value='-issues'>Issues Desc</option>
    </select>
  </form>);

SortMenu.propTypes = {
  setSortBy: PropTypes.func
};

export default SortMenu;
