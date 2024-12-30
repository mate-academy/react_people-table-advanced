import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { pathname } = useLocation();

  const location = pathname.split('/');

  return (
    <tr
      key={person.name}
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === location[location.length - 1],
      })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <NavLink
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </NavLink>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <NavLink to={`/people/${person.father.slug}`}>
            {person.father.name}
          </NavLink>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
