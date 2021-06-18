import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Mother = React.memo(
  ({ motherName, motherSlug }) => {
    const { search } = useLocation();

    if (motherName && motherSlug) {
      return (
        <Link
          to={`/people/${motherSlug}${search}#${motherSlug}`}
          className="people-section__table-link"
        >
          {motherName}
        </Link>
      );
    }

    if (motherName) {
      return (
        <span className="people-section__table-lost-mother">
          {motherName}
        </span>
      );
    }

    return (
      'unknown'
    );
  },
);

Mother.propTypes = {
  motherName: PropTypes.string,
  motherSlug: PropTypes.string,
};

Mother.defaultProps = {
  motherName: '',
  motherSlug: '',
};
