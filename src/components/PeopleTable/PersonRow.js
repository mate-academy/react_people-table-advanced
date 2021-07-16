import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const PersonRow = ({
  name,
  sex,
  born,
  died,
  motherName,
  fatherName,
}) => {
  const { search } = useLocation();
  const path = `/people/${name.replace(/ /g, '-')}-${born}`;
  const searchParams = new URLSearchParams(search);
  const sortParam = searchParams.get('sortBy') || '';

  return (
    <>
      <td
        className={classNames({ 'highlight-column': sortParam === 'name' })}
      >
        <Link
          to={{
            pathname: path,
            search,
          }}
          className="name-link"
        >
          {name}
        </Link>

      </td>
      <td
        className={classNames({ 'highlight-column': sortParam === 'sex' })}
      >
        {sex}
      </td>
      <td
        className={classNames({ 'highlight-column': sortParam === 'born' })}
      >
        {born}
      </td>
      <td
        className={classNames({ 'highlight-column': sortParam === 'died' })}
      >
        {died}
      </td>
      <td
        className={classNames({ 'highlight-column': sortParam === 'mother' })}
      >
        {motherName || 'no data'}
      </td>
      <td
        className={classNames({ 'highlight-column': sortParam === 'father' })}
      >
        {fatherName || 'no data'}
      </td>
    </>
  );
};

PersonRow.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  motherName: PropTypes.string,
  fatherName: PropTypes.string,
};

PersonRow.defaultProps = {
  motherName: '',
  fatherName: '',
};
