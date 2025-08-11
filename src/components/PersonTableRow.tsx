import React from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonTableRow: React.FC<Props> = ({ person }) => {
  const { search, pathname } = useLocation();
  const isActive = pathname.endsWith(person.slug);

  return (
    <tr data-cy="person" className={cn({ 'has-background-warning': isActive })}>
      <td>
        <Link
          to={`../${person.slug}${search}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link
            to={`../${person.mother.slug}${search}`}
            className={'has-text-danger'}
          >
            {person.mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link to={`../${person.father.slug}${search}`}>
            {person.father.name}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
