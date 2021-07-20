import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { PersonName } from './PersonName';

export function PersonRow({ person }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <tr
      className={`Person ${
        person.slug === searchParams.get('slug') ? 'highlightPerson' : ''
      }`}
    >
      <PersonName person={person} />
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {' '}
        {person.motherObj ? (
          <PersonName person={person.motherObj} />
        ) : (
          person.motherName
        )}
        {' '}
      </td>
      <td>
        {' '}
        {person.fatherObj ? (
          <PersonName person={person.fatherObj} />
        ) : (
          person.fatherName
        )}
        {' '}
      </td>
    </tr>
  );
}

PersonRow.propTypes = {
  person: PropTypes.objectOf(PropTypes.string).isRequired,
};
