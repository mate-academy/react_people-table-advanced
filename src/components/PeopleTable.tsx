// PeopleTable.tsx

import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TableHeaders } from '../types/TableHeaders';

type PeopleTableProps = {
  people: Person[];
  selectedPersonSlug: string;
  handleSelectPerson: (slug: string) => void;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPersonSlug,
  handleSelectPerson,
}) => {
  const getParent = (parentName: string | null) => {
    return people.find((parent) => parent.name === parentName);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(TableHeaders).map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedPersonSlug,
            })}
          >
            <td>
              <PersonLink person={person} onSelect={handleSelectPerson} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {getParent(person.motherName) ? (
                <PersonLink
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  person={getParent(person.motherName)!}
                  onSelect={handleSelectPerson}
                />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {getParent(person.fatherName) ? (
                <PersonLink
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  person={getParent(person.fatherName)!}
                  onSelect={handleSelectPerson}
                />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
