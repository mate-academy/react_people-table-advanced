import cn from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  slug: string | undefined,
};

export const PeopleRow: React.FC<Props> = ({ person, slug }) => {
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} searchParams={searchParams} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <p>
          {person.mother ? (
            <PersonLink person={person.mother} searchParams={searchParams} />
          )
            : person.motherName || '-'}
        </p>
      </td>
      <td>
        <p>
          {person.father ? (
            <PersonLink person={person.father} searchParams={searchParams} />
          )
            : person.fatherName || '-'}
        </p>
      </td>
    </tr>
  );
};
