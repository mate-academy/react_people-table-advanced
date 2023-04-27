import React, { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { getSearchWith } from '../utils/searchHelper';
import { SortBy } from '../types/SortBy';

type Props = {
  allPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ allPeople }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSetSort = useCallback((value: string) => {
    if (sort === value && order === null) {
      return getSearchWith(searchParams,
        { sort: value, order: 'desc' });
    }

    if (sort === value && order === 'desc') {
      return getSearchWith(searchParams,
        { sort: null, order: null });
    }

    return getSearchWith(searchParams,
      { sort: value });
  }, [sort, order, sex, query, centuries]);

  const filterPeople = useCallback((people: Person[]) => {
    let copiedPeople = [...people];

    if (sex) {
      copiedPeople = copiedPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      copiedPeople = copiedPeople
        .filter(person => centuries
          .includes(String(Math.ceil(person.born / 100))));
    }

    if (query) {
      const queryLowerCase = query.toLocaleLowerCase();

      copiedPeople = copiedPeople.filter(person => (
        person.name.toLocaleLowerCase().includes(queryLowerCase)
          || person.fatherName?.toLocaleLowerCase().includes(queryLowerCase)
          || person.motherName?.toLocaleLowerCase().includes(queryLowerCase)
      ));
    }

    return copiedPeople;
  }, [sort, order, sex, query, centuries]);

  const sortPeople = useCallback((people: Person[]) => {
    let copiedPeople = [...people];

    if (sort) {
      switch (sort) {
        case SortBy.Name:
        case SortBy.Sex:
          copiedPeople.sort((prev, curr) => (
            prev[sort].localeCompare(curr[sort])
          ));
          break;

        case SortBy.Died:
        case SortBy.Born:
          copiedPeople.sort((prev, curr) => prev[sort] - curr[sort]);
          break;

        default:
          throw new Error('Unable to sort people');
      }
    }

    if (order) {
      copiedPeople = copiedPeople.reverse();
    }

    return copiedPeople;
  }, [sort, order, sex, query, centuries]);

  const handleGetFilteredAndSortedPeople = () => {
    const filtered = filterPeople(allPeople);

    return sortPeople(filtered);
  };

  const filteredAndSortedPeople = handleGetFilteredAndSortedPeople();

  if (!filteredAndSortedPeople.length) {
    return (
      <p
        className="has-text-primary is-size-5"
      >
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortBy).map(([key, value]) => {
            return (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <Link
                    to={{
                      search: handleSetSort(value),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fa fa-sort', {
                          'fa-sort-up': !order && value === sort,
                          'fa-sort-down': order && value === sort,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredAndSortedPeople.map(person => (
          <PersonInfo
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
