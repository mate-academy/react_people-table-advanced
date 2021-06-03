import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

export const PersonName = ({ slug, name, sex }) => {
  const { url } = useRouteMatch();
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `${url}/${slug}`,
        search,
      }}
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
