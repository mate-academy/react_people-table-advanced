import React from 'react';
import { Link as PersonLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findParent = (parentName: string) => {
    return people.find(parent => parent.name === parentName)?.slug;
  };

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth"
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink
                to={`/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </PersonLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {people
                .some(mother => mother.name === person.motherName)
                && person.motherName ? (
                  <PersonLink
                    to={`/people/${findParent(person.motherName)}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </PersonLink>
                ) : (
                  <p>
                    {person.motherName || '-'}
                  </p>
                )}
            </td>

            <td>
              {people
                .some(father => father.name === person.fatherName)
                && person.fatherName ? (
                  <PersonLink
                    to={`/people/${findParent(person.fatherName)}`}
                  >
                    {person.fatherName}
                  </PersonLink>
                ) : (
                  <p>
                    {person.fatherName || '-'}
                  </p>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
