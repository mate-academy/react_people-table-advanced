import React from 'react';
import PropTypes from 'prop-types';

export const PersonName = ({ name }) => {
  return (
    <>
      {name}
    </>
  );
};

PersonName.propTypes = {
  name: PropTypes.string.isRequired,
};
