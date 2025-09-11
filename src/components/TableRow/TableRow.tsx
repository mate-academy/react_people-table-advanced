import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
};

export const TableRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <PersonLink name={person.name} slug={person.slug} sex={person.sex} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        <PersonLink
          name={person.motherName || '-'}
          slug={person.mother?.slug}
          sex={person.mother?.sex}
        />
      </td>

      <td>
        <PersonLink
          name={person.fatherName || '-'}
          slug={person.father?.slug}
          sex={person.father?.sex}
        />
      </td>
    </tr>
  );
};
