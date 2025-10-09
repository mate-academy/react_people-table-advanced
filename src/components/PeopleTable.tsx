import React from 'react';

// src/components/PeopleTable.tsx
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { search } = useLocation();

  return (
    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
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
          <tr key={person.slug}>
            <td>
              <Link
                to={{ pathname: `/people/${person.slug}`, search }}
                data-cy="personLink"
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName || '-'}</td>
            <td>{person.fatherName || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
