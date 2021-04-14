import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'semantic-ui-react';

export const Form = ({ searchValue, setSearchValue }) => {

  return (
    <Input
      value={searchValue}
      onChange={event => setSearchValue(event.target.value)}
      focus
      placeholder="Search..."
    />
  );
};

Form.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};
