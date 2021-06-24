import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

export const PersonName = ({ name, sex, slug }) => {
  const { url } = useRouteMatch();
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `${url}/${slug}`, search,
      }}
      style={{ color: sex === 'm' ? 'blue' : 'red' }}
    >
      {name}
    </Link>
  );
};

PersonName.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
  sex: PropTypes.string,
};

PersonName.defaultProps = {
  name: '',
  slug: '',
  sex: '',
};
