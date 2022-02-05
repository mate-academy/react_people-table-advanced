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
      className={classNames({ 'bg-success text-white': activeRow.includes(person.slug) })}
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
            className="btn btn-info"
          >
            {person.fatherName}
          </Link>
        )
          : <p>{person.fatherName || 'Not father'}</p>}
      </td>
      <td>
        {visiblePeople.some(elem => elem.name === person.motherNameSlug?.name) ? (
          <Link
            to={{ pathname: `${person.motherNameSlug?.slug}`, search: searchParams }}
            className="btn btn-danger"
          >
            {person.motherName}
          </Link>
        )
          : <p>{person.motherName || 'Not mother'}</p>}
      </td>
    </tr>
  );
};
