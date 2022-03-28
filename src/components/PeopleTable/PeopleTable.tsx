import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import { SortKey } from '../../types/SortKey';
import { SortOrder } from '../../types/SortOrder';

import './PeopleTable.scss';

import PersonRow from '../PersonRow';

type Props = {
  people: Person[],
  personSelected: string,
  searchParams: URLSearchParams,
  setSearchParams: (nextParams: {}) => void,
};

const sortPeople = (people: Person[], sortBy: string, sortOrder: string) => {
  if (sortBy === '') {
    return [...people];
  }

  return [...people].sort((a, b) => {
    switch (sortBy) {
      case SortKey.Name:
      case SortKey.Sex:
        return sortOrder === SortOrder.Asc
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy]);

      case SortKey.Born:
      case SortKey.Died:
        return sortOrder === SortOrder.Asc
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];

      case SortKey.MotherName:
      case SortKey.FatherName:
      {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (valueA === null && valueB === null) {
          return 0;
        }

        if (valueA === null) {
          return sortOrder === SortOrder.Asc ? 1 : -1;
        }

        if (valueB === null) {
          return sortOrder === SortOrder.Asc ? -1 : 1;
        }

        return sortOrder === SortOrder.Asc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
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
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || '');

  const sortedPeople = useMemo(
    () => sortPeople(people, sortBy, sortOrder),
    [sortBy, people, sortOrder],
  );

  const handleSortChange = (key: string) => {
    if (sortBy !== key) {
      setSortBy(key);
      setSortOrder(SortOrder.Asc);
      searchParams.set('sortOrder', SortOrder.Asc);
    } else if (sortOrder === SortOrder.Desc) {
      setSortOrder(SortOrder.Asc);
      searchParams.set('sortOrder', SortOrder.Asc);
    } else {
      setSortOrder(SortOrder.Desc);
      searchParams.set('sortOrder', SortOrder.Desc);
    }

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
              { 'PeopleTable__header--sorted-desc': sortBy === SortKey.Name && sortOrder === SortOrder.Desc },
            )}
            onClick={() => handleSortChange(SortKey.Name)}
          >
            Name
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.Sex },
              { 'PeopleTable__header--sorted-desc': sortBy === SortKey.Sex && sortOrder === SortOrder.Desc },
            )}
            onClick={() => handleSortChange(SortKey.Sex)}
          >
            Sex
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.Born },
              { 'PeopleTable__header--sorted-desc': sortBy === SortKey.Born && sortOrder === SortOrder.Desc },
            )}
            onClick={() => handleSortChange(SortKey.Born)}
          >
            Born
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.Died },
              { 'PeopleTable__header--sorted-desc': sortBy === SortKey.Died && sortOrder === SortOrder.Desc },
            )}
            onClick={() => handleSortChange(SortKey.Died)}
          >
            Died
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.MotherName },
              { 'PeopleTable__header--sorted-desc': sortBy === SortKey.MotherName && sortOrder === SortOrder.Desc },
            )}
            onClick={() => handleSortChange(SortKey.MotherName)}
          >
            Mother&apos;s name
          </th>
          <th
            className={classNames(
              'PeopleTable__header',
              { 'PeopleTable__header--sorted': sortBy === SortKey.FatherName },
              { 'PeopleTable__header--sorted-desc': sortBy === SortKey.FatherName && sortOrder === SortOrder.Desc },
            )}
            onClick={() => handleSortChange(SortKey.FatherName)}
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
