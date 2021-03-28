import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { PersonName } from './PersonName';

export const PersonRow = ({ person }) => {
  const match = useRouteMatch('/people/:personId?');
  const { personId } = match.params;

  return (
    <tr
      className="Person"
      style={{
        backgroundColor: person.slug === personId
          ? 'greenyellow'
          : 'inherit',
      }}
    >
      <PersonName name={person.name} slug={person.slug} sex={person.sex} />
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.mother
        ? (
          <PersonName
            name={person.mother.name}
            slug={person.mother.slug}
            sex={person.mother.sex}
          />
        )
        : <td>{person.motherName}</td>
      }
      {person.father
        ? (
          <PersonName
            name={person.father.name}
            slug={person.father.slug}
            sex={person.father.sex}
          />
        )
        : <td>{person.fatherName}</td>
      }
    </tr>
  );
};

PersonRow.propTypes = {
  person: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    fatherName: PropTypes.string,
    motherName: PropTypes.string,
    slug: PropTypes.string.isRequired,
    mother: PropTypes.array,
    father: PropTypes.array,
  }).isRequired,
};
