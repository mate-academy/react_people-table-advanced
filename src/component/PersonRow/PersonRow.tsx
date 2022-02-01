import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person,
  visiblePeople: Person[],
};

export const PersonRow: React.FC<Props> = ({ person, visiblePeople }) => {
  const location = useLocation();

  const activeRow = location.pathname;
  const searchParams = location.search;

  return (
    <tr
      key={person.slug}
      className={classNames({ 'is-selected has-background-success': activeRow.includes(person.slug) })}
    >
      <td>
        {person.name}
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
        {visiblePeople.some(elem => elem.name === person.fatherNameSlug?.name) ? (
          <Link
            to={{ pathname: `${person.fatherNameSlug?.slug}`, search: searchParams }}
            className="button is-info is-inverted"
          >
            {person.fatherName}
          </Link>
        )
          : <p className="pl-4">{person.fatherName || 'Not father'}</p>}
      </td>
      <td>
        {visiblePeople.some(elem => elem.name === person.motherNameSlug?.name) ? (
          <Link
            to={{ pathname: `${person.motherNameSlug?.slug}`, search: searchParams }}
            className="button is-danger is-inverted"
          >
            {person.motherName}
          </Link>
        )
          : <p className="pl-4">{person.motherName || 'Not mother'}</p>}
      </td>
    </tr>
  );
};
