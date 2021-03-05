import React, { FC } from 'react';
import { PersonRow } from './PersonRow';
import { Person, PeopleTableProps } from './typesDefinitions'
import { useParams } from 'react-router-dom';
import { TABLE_HEADERS } from './constants';
import { TableHeader } from './TableHeader';

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      {!!people.length && <table className="table table-hover">
        <thead>
          <tr>
            {TABLE_HEADERS.map(header =>
              <th key={header}>
                <TableHeader header={header} filteredPeople={people} />
              </th>)}
            <th>MOTHER</th>
            <th>FATHER</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person: Person) => (
            <PersonRow
              slug={slug}
              people={people}
              person={person}
              key={person.slug}
            />
          ))}
        </tbody>
      </table>}
    </div>
  );
};
