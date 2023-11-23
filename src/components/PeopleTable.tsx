/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// PeopleTable.tsx

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
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

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSort = (header: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort === header.toLowerCase() && order === 'asc') {
      newParams.set('sort', header.toLowerCase());
      newParams.set('order', 'desc');
    } else if (sort === header.toLowerCase() && order === 'desc') {
      newParams.delete('sort');
      newParams.delete('order');
    } else {
      newParams.set('sort', header.toLowerCase());
      newParams.set('order', 'asc');
    }

    setSearchParams(newParams);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(TableHeaders).map((header, index) => {
            const isActive = sort === header.toLowerCase();
            const iconClass = classNames({
              'fas fa-sort-up': isActive && order === 'asc',
              'fas fa-sort-down': isActive && order === 'desc',
              'fas fa-sort': !isActive,
            });

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  {index < 4 && (
                    <a onClick={() => handleSort(header.toLowerCase())}>
                      <span className="icon">
                        <i className={iconClass} />
                      </span>
                    </a>
                  )}
                </span>
              </th>
            );
          })}
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
