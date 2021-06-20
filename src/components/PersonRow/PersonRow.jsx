import React from 'react';
import PropTypes from 'prop-types';
import { PersonName } from '../PersonName';

export const PersonRow = ({ person, isSelected }) => (
  <tr
    className={isSelected
      ? `is-selected ${
        person.sex === 'f'
          ? 'has-background-danger-dark'
          : 'has-background-link-dark'
      }` : ''
    }
    id={person.slug}
  >
    <td>
      <PersonName person={person} />
    </td>
    <td>
      {person.sex}
    </td>
    <td>
      {person.born}
    </td>
    <td>
      {person.died}
    </td>
    <td>
      {person.mother !== null
        ? <PersonName person={person.mother} isParent />
        : <p className="has-text-weight-bold">{person.motherName}</p>
      }
    </td>
    <td>
      {person.father !== null
        ? <PersonName person={person.father} isParent />
        : <p className="has-text-weight-bold">{person.fatherName}</p>
      }
    </td>
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    motherName: PropTypes.string.isRequired,
    fatherName: PropTypes.string.isRequired,
    mother: PropTypes.shape().isRequired,
    father: PropTypes.shape().isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
};
