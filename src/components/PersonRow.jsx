/* eslint-disable arrow-body-style */
import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { PersonName } from './PersonName';

export const PersonRow = ({ person }) => {
  const {
    name, sex, born, died,
    mother, father, motherName, fatherName,
  } = person;

  const searchParams = new URLSearchParams(useLocation().search);
  const slug = searchParams.get('slug');

  return (
    <tr
      key={name}
      className={cn('tr', {
        selectedPerson: slug
          === `${name.toLowerCase().split(' ').join('-')}-${born}`,
      })}
    >
      <td className="td">
        <PersonName person={person} />
      </td>
      <td className="td">{sex}</td>
      <td className="td">{born}</td>
      <td className="td">{died}</td>
      <td className="td">
        {mother
          ? <PersonName person={mother} />
          : motherName}
      </td>
      <td className="td">
        {father
          ? <PersonName person={father} />
          : fatherName}
      </td>
    </tr>
  );
};

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
    mother: PropTypes.object,
    father: PropTypes.object,
  }).isRequired,
};
