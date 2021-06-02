import React from 'react';
import PropTypes from 'prop-types';

const KEYS = [
  'name', 'sex', 'born', 'died', 'motherName', 'fatherName',
];

export const PersonRow = ({ person }) => (
  person && (
    <tr className="Person">
      {KEYS.map(key => (
        <td key={key}>
          {person[key]}
        </td>
      ))}
    </tr>
  )
);

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
  }),
};

PersonRow.defaultProps = {
  person: null,
};
