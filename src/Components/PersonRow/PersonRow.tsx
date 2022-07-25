import React from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../Types/Person';
import './PersonRow.scss';

type Props = {
  person: Person,
  mother: Person | undefined,
  father: Person | undefined,
};

export const PersonRow: React.FC<Props> = React.memo(({
  person,
  mother,
  father,
}) => {
  const match = useMatch('/people/:slug');
  const selectedPerson = match?.params.slug;
  const location = useLocation();

  return (
    <tr className={classNames(
      'person',
      {
        person__selected: selectedPerson === person.slug,
      },
    )}
    >
      <td>
        <NavLink
          to={{
            pathname: `/people/${person.slug}`,
            search: location.search,
          }}
          className={classNames(
            'person',
            {
              person__male: person.sex === 'm',
              person__female: person.sex === 'f',
            },
          )}
        >
          {person.name}
        </NavLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <NavLink
            to={{
              pathname: `/people/${person.slug}`,
              search: location.search,
            }}
            className={classNames(
              {
                person__male: person.sex === 'm',
                person__female: person.sex === 'f',
              },
            )}
          >
            {mother.name}
          </NavLink>
        ) : (
          <span className="person__parent">{person.motherName}</span>
        )}
      </td>
      <td>
        {father ? (
          <NavLink
            to={{
              pathname: `/people/${person.slug}`,
              search: location.search,
            }}
            className={classNames(
              {
                person__male: person.sex === 'm',
                person__female: person.sex === 'f',
              },
            )}
          >
            {father.name}
          </NavLink>
        ) : (
          <span className="person__parent">{person.fatherName}</span>
        )}
      </td>
    </tr>
  );
});
