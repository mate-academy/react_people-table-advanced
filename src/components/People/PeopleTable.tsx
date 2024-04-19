/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../../types';
import { PersonItem } from './PersonItem';
import { Columns } from '../../types/Columns';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  query: string;
  sex: string | null;
  centuries: string[];
};

const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  let sortedPeople = people;

  switch (sort) {
    case 'name':
      sortedPeople = sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'sex':
      sortedPeople = sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case 'born':
      sortedPeople = sortedPeople.sort((a, b) => a.born - b.born);
      break;
    case 'died':
      sortedPeople = sortedPeople.sort((a, b) => a.died - b.died);
      break;
    default:
      return sortedPeople;
  }

  if (order === 'desc') {
    sortedPeople = sortedPeople.reverse();
  }

  return sortedPeople;
};

const filterPeople = (
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
) => {
  let filteredPeople = people;

  if (query) {
    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.some(century => Math.ceil(person.born / 100) === +century),
    );
  }

  return filteredPeople;
};

const prepareVisiblePeople = (
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
) => {
  let visiblePeople: Person[] = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  if (query || sex || centuries) {
    visiblePeople = filterPeople(visiblePeople, query, sex, centuries);
  }

  if (sort || order) {
    visiblePeople = sortPeople(visiblePeople, sort, order);
  }

  return visiblePeople;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  query,
  sex,
  centuries,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = prepareVisiblePeople(
    people,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  const handleOrderSort = (sortType: string) => {
    if (order === 'desc') {
      return { sort: null, order: null };
    } else {
      return { sort: sortType, order: sort && !order ? 'desc' : null };
    }
  };

  const isColumnHasFilter = (column: Columns) =>
    column === 'Mother' || column === 'Father';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(Columns).map(column =>
            isColumnHasFilter(column) ? (
              <th key={column}>{column}</th>
            ) : (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column}
                  <SearchLink params={handleOrderSort(column.toLowerCase())}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !sort || sort !== column.toLowerCase(),
                          'fa-sort-up': sort === column.toLowerCase() && !order,
                          'fa-sort-down':
                            sort === column.toLowerCase() && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
