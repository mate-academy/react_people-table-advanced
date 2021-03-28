import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export const PersonName = ({ name, slug, sex }) => {
  const { search } = useLocation();

  return (
    <td>
      <Link
        to={{
          pathname: `/people/${slug}`,
          search,
        }}
        style={{ color: sex === 'f' ? 'red' : 'blue' }}
      >
        {name}
      </Link>
    </td>
  );
};

PersonName.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};
