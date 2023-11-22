// PeopleTable.tsx

import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { TableHeaders } from '../types/TableHeaders';
import { PeopleTableProps } from '../types/PeopleTableProps';

export const PeopleTable: React.FC<PeopleTableProps> = ({
  filteredPeople,
  selectedPersonSlug,
  handleSelectPerson,
}) => {
  const getParent = (parentName: string | null) => {
    return filteredPeople.find((parent) => parent.name === parentName);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(TableHeaders).map((header, index) => (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}
                {index < 4 && (
                  <Link to={`?sort=${header.toLowerCase()}`}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </Link>
                )}
              </span>
            </th>
          ))}
        </tr>

      </thead>
      <tbody>
        {filteredPeople.map((person) => (
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
