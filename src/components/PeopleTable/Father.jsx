import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Father = React.memo(
  ({ fatherName, fatherSlug }) => {
    const { search } = useLocation();

    if (fatherName && fatherSlug) {
      return (
        <Link
          to={`/people/${fatherSlug}${search}#${fatherSlug}`}
          className="people-section__table-link"
        >
          {fatherName}
        </Link>
      );
    }

    if (fatherName) {
      return (
        <span className="people-section__table-lost-father">
          {fatherName}
        </span>
      );
    }

    return (
      'unknown'
    );
  },
);

Father.propTypes = {
  fatherName: PropTypes.string,
  fatherSlug: PropTypes.string,
};

Father.defaultProps = {
  fatherName: '',
  fatherSlug: '',
};
