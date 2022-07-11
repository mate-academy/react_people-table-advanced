import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './PersonRow.scss';
import { useParams, useLocation } from 'react-router-dom';

import { PersonName } from '../PersonName/PersonName';

export const PersonRow = ({ mother, father, ...person }) => {
  const { selectedSlug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';

  return (
    <tr
      key={person.slug}
      id={person.slug}
      className={classNames(
        'Person',
        { 'person-selected': person.slug === selectedSlug },
      )}
    >
      <>
        <td className={classNames('person-name',
          { sorted_column: sortBy === 'name' })}
        >
          <PersonName personData={person} />
        </td>
        <td className={classNames('person-sex',
          { sorted_column: sortBy === 'sex' })}
        >
          {person.sex === 'f' ? 'Female' : 'Male'}
        </td>
        <td className={classNames('person-born',
          { sorted_column: sortBy === 'born' })}
        >
          {person.born}
        </td>
        <td className={classNames('person-died',
          { sorted_column: sortBy === 'died' })}
        >
          {person.died}
        </td>
        <td className={classNames('person-mother',
          { 'not-found': mother === 'no data' })}
        >
          {mother !== 'no data'
            ? (<PersonName personData={mother} />)
            : person.motherName || 'No data'
        }
        </td>
        <td className={classNames('person-father',
          { 'not-found': father === 'no data' })}
        >
          {father !== 'no data'
            ? (<PersonName personData={father} />)
            : person.fatherName || 'No data'
        }
        </td>
      </>
    </tr>
  );
};

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  mother: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
      born: PropTypes.number,
      died: PropTypes.number,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
      slug: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
  father: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
      born: PropTypes.number,
      died: PropTypes.number,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
      slug: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
};
