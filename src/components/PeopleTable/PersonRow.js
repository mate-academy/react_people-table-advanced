import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

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

  return (
    <>
      <td>
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
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName || 'undefined'}</td>
      <td>{fatherName || 'undefined'}</td>
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
  motherName: '---',
  fatherName: '---',
};
