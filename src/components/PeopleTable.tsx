/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonItem } from './PersonItem/PersonItem';

type Props = {
  people: Person[],
};

enum Sort {
  notSorted,
  sortAsc,
  sortDesc,
}

type SortBy = 'name' | 'sex' | 'born' | 'died' | null;

export const PeopleTable = ({ people }:Props) => {
  const params = useParams();
  const [slugUser, setSlugUser] = useState<string | undefined>(params.slug);
  const [searchParams, setSearchParams]
  = useSearchParams((window.location.hash).slice(8));
  const [sexSort, setSexSort] = useState<Sort>(Sort.notSorted);
  const [nameSort, setNameSort] = useState<Sort>(Sort.notSorted);
  // const [diedSort, setDiedSort] = useState<Sort>(Sort.notSorted);
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
    if (sort === Sort.notSorted) {
      setSort(Sort.sortAsc);
      searchParams.set('sort', columnName);
      setSearchParams(searchParams);
    } else if (sort === Sort.sortAsc) {
      setSort(Sort.sortDesc);
      searchParams.set('order', 'desc');
      setSearchParams(searchParams);
    } else {
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
              <a
                href={searchParams.has('sort') ? `#/people?${searchParams.toString()}`
                  : '#/people'}
                onClick={() => {
                  searchParams.delete('order');
                  handleSort(nameSort, setNameSort, 'name');
                  setSexSort(Sort.notSorted);
                  setBornSort(Sort.notSorted);
                  setDiedSort(Sort.notSorted);
                }}
              >
                <span className="icon">
                  <i
                    className={ActiveLinkSexClassName(nameSort)}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href={searchParams.has('sort') ? `#/people?${searchParams.toString()}`
                  : '#/people'}
                onClick={() => {
                  searchParams.delete('order');
                  handleSort(sexSort, setSexSort, 'sex');
                  setNameSort(Sort.notSorted);
                  setBornSort(Sort.notSorted);
                  setDiedSort(Sort.notSorted);
                }}
              >
                <span className="icon">
                  <i
                    className={ActiveLinkSexClassName(sexSort)}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href={searchParams.has('sort') ? `#/people?${searchParams.toString()}`
                  : '#/people'}
                onClick={() => {
                  searchParams.delete('order');
                  handleSort(bornSort, setBornSort, 'born');
                  setNameSort(Sort.notSorted);
                  setSexSort(Sort.notSorted);
                  setDiedSort(Sort.notSorted);
                }}
              >
                <span className="icon">
                  <i
                    className={ActiveLinkSexClassName(bornSort)}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href={searchParams.has('sort') ? `#/people?${searchParams.toString()}`
                  : '#/people'}
                onClick={() => {
                  searchParams.delete('order');
                  handleSort(diedSort, setDiedSort, 'died');
                  setNameSort(Sort.notSorted);
                  setSexSort(Sort.notSorted);
                  setBornSort(Sort.notSorted);
                }}
              >
                <span className="icon">
                  <i
                    className={ActiveLinkSexClassName(diedSort)}
                  />
                </span>
              </a>
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
            searchParams={searchParams.toString()}
          />
        ))}
      </tbody>
    </table>
  );
};
