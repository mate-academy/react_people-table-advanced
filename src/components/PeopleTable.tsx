/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';

interface Props {
  data: Person[] | null;
}

export const PeopleTable: React.FC<Props> = ({ data }) => {
  const { personId } = useParams();
  const getPersonSlug = (name: string, born: number) =>
    `${name.toLowerCase().trim().replace(/\s+/g, '-')}-${born}`;

  const getPersonByName = (name: string | null) =>
    data?.find(person => person.name === name) || null;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {data?.map((person, index) => {
          const slug = getPersonSlug(person.name, person.born);
          const mother = getPersonByName(person.motherName || null);
          const father = getPersonByName(person.fatherName || null);

          return (
            <tr
              key={index}
              data-cy="person"
              className={classNames({
                'has-background-warning': personId === slug,
              })}
            >
              <td>
                <NavLink
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                  to={`/people/${slug}`}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <NavLink
                      to={`/people/${getPersonSlug(mother.name, mother.born)}`}
                      className="has-text-danger"
                    >
                      {mother.name}
                    </NavLink>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <NavLink
                      to={`/people/${getPersonSlug(father.name, father.born)}`}
                    >
                      {father.name}
                    </NavLink>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
