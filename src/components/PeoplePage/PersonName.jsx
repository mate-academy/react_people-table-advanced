import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const PersonName = ({ url, name, sex }) => (
  <Link
    className={sex === 'f'
      ? 'PeopleTable__link-woman'
      : 'PeopleTable__link-man'}
    to={{ pathname: url }}
  >
    {name}
  </Link>
);

PersonName.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string,
  sex: PropTypes.string,
};

PersonName.defaultProps = {
  name: '',
  sex: '',
};
