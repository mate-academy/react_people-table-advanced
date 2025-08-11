/* eslint-disable no-console */

import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

type PersonItemProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonItemProps) => {
  const { pathname } = useLocation();

  const checkParents = (parent: string | null, isMother: boolean) => {
    if (!parent) {
      return '-';
    }

    const parentSlug = isMother ? person.mother?.slug : person.father?.slug;

    return parentSlug ? (
      <Link
        className={cn({ 'has-text-danger': isMother })}
        to={`/people/${parentSlug}`}
      >
        {parent}
      </Link>
    ) : (
      parent
    );
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': pathname.includes(person.slug),
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{checkParents(person.motherName ?? null, true)}</td>
      <td>{checkParents(person.fatherName ?? null, false)}</td>
    </tr>
  );
};
