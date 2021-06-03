import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useRouteMatch } from 'react-router-dom';

export const PersonName = ({ slug, name, sex }) => {
  const { url } = useRouteMatch();

  return (
    <Link
      to={`${url}/${slug}`}
      className={cn({
        'has-text-info': sex === 'm',
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};

PersonName.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string,
  sex: PropTypes.string,
};

PersonName.defaultProps = {
  name: '',
  sex: '',
};
