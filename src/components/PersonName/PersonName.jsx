import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import 'bulma';
import './PersonName.scss';

export const PersonName = ({ name, wasFound, sex, slug }) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return (
    <>
      {wasFound
        ? (
          <Link
            to={`/people/${slug}?${searchParams.toString()}`}
            className={classnames({
              'found-man': sex === 'm',
              'found-woman': sex === 'f',
            })}
          >
            {name}
          </Link>
        )
        : <span className="not-found">{name}</span>}
    </>
  );
};

PersonName.propTypes = {
  name: PropTypes.string,
  wasFound: PropTypes.bool,
  sex: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

PersonName.defaultProps = {
  wasFound: false,
  name: '',
};
