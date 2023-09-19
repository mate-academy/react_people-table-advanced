/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonItem } from './PersonItem/PersonItem';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  allParams: string,
};

enum Sort {
  notSorted,
  sortAsc,
  sortDesc,
}

type SortBy = 'name' | 'sex' | 'born' | 'died' | null;

export const PeopleTable = ({ people, allParams }:Props) => {
  const params = useParams();
  const [slugUser, setSlugUser] = useState<string | undefined>(params.slug);
  const [searchParams, setSearchParams] = useSearchParams(
    (window.location.hash).substring(window.location.hash.indexOf('?')),
  );
  const [sexSort, setSexSort] = useState<Sort>(Sort.notSorted);
  const [nameSort, setNameSort] = useState<Sort>(Sort.notSorted);
  const [bornSort, setBornSort] = useState<Sort>(Sort.notSorted);
  const [diedSort, setDiedSort] = useState<Sort>(Sort.notSorted);
  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  const handleSlugUser = (value: string) => {
    setSlugUser(value);
  };

  const ActiveLinkSexClassName = (sort: Sort) => cn(
    { 'fas fa-sort': sort === Sort.notSorted },
    { 'fas fa-sort-up': sort === Sort.sortAsc },
    { 'fas fa-sort-down': sort === Sort.sortDesc },
  );

  const handleSort = (
    sort: Sort,
    setSort: (sort: Sort) => void,
    columnName: string,
  ) => {
    switch (sort) {
      case Sort.notSorted:
        setSort(Sort.sortAsc);
        searchParams.set('sort', columnName);
        setSearchParams(searchParams);
        break;
      case Sort.sortAsc:
        setSort(Sort.sortDesc);
        searchParams.set('order', 'desc');
        setSearchParams(searchParams);
        break;
      default:
        setSort(Sort.notSorted);
        searchParams.delete('sort');
        searchParams.delete('order');
    }
  };

  const arraySort = (columnName: SortBy) => {
    let sort: Sort = Sort.notSorted;

    switch (columnName) {
      case 'name':
        sort = nameSort;
        break;
      case 'sex':
        sort = sexSort;
        break;
      case 'born':
        sort = bornSort;
        break;
      case 'died':
        sort = diedSort;
        break;
      default: break;
    }

    if (columnName) {
      switch (sort) {
        case Sort.sortAsc:
          return (people.slice().sort((a, b) => {
            const valueA = a[columnName];
            const valueB = b[columnName];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
              return valueA.localeCompare(valueB);
            } else if (
              typeof valueA === 'number' && typeof valueB === 'number'
            ) {
              return valueA - valueB;
            }

            return 0;
          }));
        case Sort.sortDesc:
          return (people.slice().sort((a, b) => {
            const valueA = a[columnName];
            const valueB = b[columnName];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
              return valueB.localeCompare(valueA);
            } else if (
              typeof valueA === 'number' && typeof valueB === 'number'
            ) {
              return valueB - valueA;
            }

            return 0;
          }));
        case Sort.notSorted:
          return [...people];
        default:
          return people;
      }
    }

    return people;
  };

  useEffect(() => {
    const sort = (searchParams.get('sort'));

    switch (sort) {
      case 'name':
        setNameSort(Sort.sortAsc);
        searchParams.get('order') === 'desc'
          ? setNameSort(Sort.sortDesc) : null;
        setSortBy('name');
        break;
      case 'sex':
        setSexSort(Sort.sortAsc);
        searchParams.get('order') === 'desc'
          ? setSexSort(Sort.sortDesc) : null;
        setSortBy('sex');
        break;
      case 'born':
        setBornSort(Sort.sortAsc);
        searchParams.get('order') === 'desc'
          ? setBornSort(Sort.sortDesc) : null;
        setSortBy('born');
        break;
      case 'died':
        setDiedSort(Sort.sortAsc);
        searchParams.get('order') === 'desc'
          ? setDiedSort(Sort.sortDesc) : null;
        setSortBy('died');
        break;
      default: break;
    }
  }, [searchParams]);

  const sortedPeople = arraySort(sortBy);

  const sort = (value: string) => {
    return searchParams.get('sort') !== value || !searchParams.has('order')
      ? value : null;
  };

  const order = (value: string) => {
    return searchParams.get('sort') === value && !searchParams.has('order')
      ? 'desc' : null;
  };

  const sortName = () => {
    searchParams.delete('order');
    handleSort(nameSort, setNameSort, 'name');
    setSexSort(Sort.notSorted);
    setBornSort(Sort.notSorted);
    setDiedSort(Sort.notSorted);
  };

  const sortSex = () => {
    searchParams.delete('order');
    handleSort(sexSort, setSexSort, 'sex');
    setNameSort(Sort.notSorted);
    setBornSort(Sort.notSorted);
    setDiedSort(Sort.notSorted);
  };

  const sortBorn = () => {
    searchParams.delete('order');
    handleSort(bornSort, setBornSort, 'born');
    setSexSort(Sort.notSorted);
    setNameSort(Sort.notSorted);
    setDiedSort(Sort.notSorted);
  };

  const sortDied = () => {
    searchParams.delete('order');
    handleSort(diedSort, setDiedSort, 'died');
    setSexSort(Sort.notSorted);
    setBornSort(Sort.notSorted);
    setNameSort(Sort.notSorted);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={{ sort: sort('name'), order: order('name') }}
                onClick={sortName}
              >
                <span className="icon">
                  <i
                    className={ActiveLinkSexClassName(nameSort)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{ sort: sort('sex'), order: order('sex') }}
                onClick={sortSex}
              >
                <span className="icon">
                  <i
                    className={ActiveLinkSexClassName(sexSort)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{ sort: sort('born'), order: order('born') }}
                onClick={sortBorn}
              >
                <span className="icon">
                  <i
                    className={ActiveLinkSexClassName(bornSort)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{ sort: sort('died'), order: order('died') }}
                onClick={sortDied}
              >
                <span className="icon">
                  <i
                    className={ActiveLinkSexClassName(diedSort)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            people={people}
            handleSlugUser={handleSlugUser}
            slugUser={slugUser}
            allParams={allParams}
          />
        ))}
      </tbody>
    </table>
  );
};
