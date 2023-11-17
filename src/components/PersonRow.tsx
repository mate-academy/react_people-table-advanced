import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person
  people: Person[]
};

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const getSlugByName = (name: string | null) => {
    return people.find(p => p.name === name)?.slug;
  };

  const getPersonLink = (personName: string | null) => {
    const slug = getSlugByName(personName);
    const sParams = searchParams.toString()
      && `/?${searchParams.toString()}`;

    return `./${slug}${sParams}`;
  };

  const isPersonInTable = (personName: string | null) => {
    if (personName) {
      return people.find(p => p.name === personName);
    }

    return false;
  };

  const getParentName = (name: string | null, sex?: string) => {
    return (
      <td>
        {isPersonInTable(name)
          ? (
            <Link
              to={getPersonLink(name)}
              className={cn({
                'has-text-danger': sex === 'f',
              })}
            >
              {name}
            </Link>
          )
          : (
            (name || '-')
          )}
      </td>
    );
  };

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn(
        { 'has-background-warning': person.slug === personSlug },
      )}
    >
      <td>
        <Link
          to={getPersonLink(person.name)}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {getParentName(person.motherName, 'f')}
      {getParentName(person.fatherName)}
    </tr>
  );
};
