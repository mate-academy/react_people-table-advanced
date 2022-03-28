import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import { SortKey } from '../../types/SortKey';

import './PeopleTable.scss';

import PersonRow from '../PersonRow';

type Props = {
  people: Person[],
  personSelected: string,
  searchParams: URLSearchParams,
  setSearchParams: (nextParams: {}) => void,
};

const sortPeople = (people: Person[], sortBy: string) => {
  if (sortBy === '') {
    return [...people];
  }

  return [...people].sort((a, b) => {
    switch (sortBy) {
      case SortKey.Name:
      case SortKey.Sex:
        return a[sortBy].localeCompare(b[sortBy]);

      case SortKey.Born:
      case SortKey.Died:
        return a[sortBy] - b[sortBy];

      case SortKey.MotherName:
      case SortKey.FatherName:
      {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (valueA === null && valueB === null) {
          return 0;
        }

        if (valueA === null) {
          return 1;
        }

        if (valueB === null) {
          return -1;
        }

        return valueA.localeCompare(valueB);
      }

      default:
        return 0;
    }
  });
};

export const PeopleTable: React.FC<Props> = ({
  people,
  personSelected,
  searchParams,
  setSearchParams,
}) => {
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');

  const sortedPeople = useMemo(
    () => sortPeople(people, sortBy),
    [sortBy, people],
  );

  const changeSortKey = (key: string) => {
    setSortBy(key);
    searchParams.set('sortBy', key);
    setSearchParams(searchParams);
  };

  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.Name },
            )}
            onClick={() => changeSortKey(SortKey.Name)}
          >
            Name
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.Sex },
            )}
            onClick={() => changeSortKey(SortKey.Sex)}
          >
            Sex
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.Born },
            )}
            onClick={() => changeSortKey(SortKey.Born)}
          >
            Born
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.Died },
            )}
            onClick={() => changeSortKey(SortKey.Died)}
          >
            Died
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.MotherName },
            )}
            onClick={() => changeSortKey(SortKey.MotherName)}
          >
            Mother&apos;s name
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.FatherName },
            )}
            onClick={() => changeSortKey(SortKey.FatherName)}
          >
            Father&apos;s name
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map(person => (
          <PersonRow person={person} key={person.slug} personSelected={personSelected} />
        ))}
      </tbody>
    </table>
  );
};
