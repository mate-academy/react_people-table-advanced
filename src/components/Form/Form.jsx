import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'semantic-ui-react';

export const Form = ({ searchValue, history }) => (
  <Input
    value={searchValue && searchValue.length ? searchValue : ''}
    onChange={event => history.push(`?query=${event.target.value}`)}
    focus
    placeholder="Search..."
  />
);

Form.propTypes = {
  searchValue: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Form.defaultProps = {
  searchValue: '',
  history: {},
};
