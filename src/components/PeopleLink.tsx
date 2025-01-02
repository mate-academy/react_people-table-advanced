import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person;
  parent: 'mother' | 'father';
};

const getParentLink = (person: Person, parent: 'mother' | 'father') => {
  if (!person[parent] && !person[`${parent}Name`]) {
    return '-';
  }

  return person[parent] ? (
    <Link
      to={`/people/${person[parent].slug}`}
      className={cn({
        'has-text-danger': parent === 'mother',
      })}
    >
      {person[parent].name}
    </Link>
  ) : (
    person[`${parent}Name`]
  );
};

export const PeopleLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const isActivePeople = slug === person.slug;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isActivePeople })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getParentLink(person, 'mother')}</td>
      <td>{getParentLink(person, 'father')}</td>
    </tr>
  );
};
