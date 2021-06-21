import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';

export const PersonName = ({ person, isParent = false }) => {
  const location = useLocation();

  return (
    <Link
      smooth
      to={{
        pathname: `/people/:${
          person.slug
        }${
          location.pathname.includes('/new')
            ? '/new' : ''
        }`,
        hash: isParent ? `#${person.slug}` : '',
        search: location.search,
      }}
    >
      {person.name || '-'}
    </Link>
  );
};

PersonName.propTypes = {
  person: PropTypes.shape().isRequired,
  isParent: PropTypes.bool,
};

PersonName.defaultProps = {
  isParent: false,
};
