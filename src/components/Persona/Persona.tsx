import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PerrsonLink/PersonLink';

type Props = {
  person: Person;
};

export const Persona: React.FC<Props> = React.memo(
  ({ person }) => {
    const { slug = '' } = useParams();
    const isSelected = (person.slug === slug);

    return (
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': isSelected,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        
        <td>
          {person.mother
            ? <PersonLink person={person.mother} />
            : person.motherName || '-'}
        </td>
        <td>
          {person.father
            ? <PersonLink person={person.father} />
            : person.fatherName || '-'}
        </td>
      </tr>
    );
  },
);
