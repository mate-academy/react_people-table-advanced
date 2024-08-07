/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  peopleFromApi: Person[];
  selectedSlug: string;
};

export const PeopleTable = ({ peopleFromApi, selectedSlug }: Props) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || null;
  const sortOrder = searchParams.get('order') || null;
  const sexFilter = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const findParents = (parent: string | '') => {
    return peopleFromApi.find(person => person.name === parent);
  };

  const sortingFields = [
    {
      value: 'Name',
      param: 'name',
    },
    { value: 'Sex', param: 'sex' },
    {
      value: 'Born',
      param: 'born',
    },
    {
      value: 'Died',
      param: 'died',
    },
  ];

  const handleSortedPeople = () => {
    let sortedTable = [...peopleFromApi];

    if (query) {
      sortedTable = sortedTable.filter(searchedText => {
        const text = `${searchedText.name}${searchedText.motherName}${searchedText.fatherName}`;

        return text.trim().toLowerCase().includes(query.trim().toLowerCase());
      });
    }

    if (centuries.length) {
      sortedTable = sortedTable.filter(person => {
        const bornInCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(bornInCentury);
      });
    }

    if (sexFilter) {
      if (sexFilter === 'm') {
        sortedTable = sortedTable.filter(person => person.sex === 'm');
      }

      if (sexFilter === 'f') {
        sortedTable = sortedTable.filter(person => person.sex === 'f');
      }

      return sortedTable;
    }

    return sortedTable;
  };

  const sortedPeople = handleSortedPeople();

  const filteringPeople = useMemo(() => {
    const filteredPeople = [...sortedPeople].sort((person1, person2) => {
      switch (sortField) {
        case 'sex':
        case 'name':
          return person1[sortField].localeCompare(person2[sortField]);
        case 'died':
        case 'born':
          return +person1[sortField] - +person2[sortField];
        default:
          return 0;
      }
    });

    if (sortOrder === 'desc') {
      filteredPeople.reverse();
    }

    return filteredPeople;
  }, [sortField, sortOrder, sortedPeople]);

  const handleSortingParams = (sort: string) => {
    if (sortField !== sort) {
      return { sort: sort, order: null };
    }

    if (sortField === sort && !sortOrder) {
      return { sort: sort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const handleChangingClasses = (keyValue: string) => {
    if (keyValue === 'mother' || keyValue === 'father') {
      return;
    }

    if (sortField !== keyValue) {
      return 'fas fa-sort';
    }

    if (sortField === keyValue && sortOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  return (
    <>
      {' '}
      {!filteringPeople.length ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          {filteringPeople.length > 0 && (
            <thead>
              <tr>
                {sortingFields.map(field => (
                  <th key={field.param}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {field.value}
                      <SearchLink params={handleSortingParams(field.param)}>
                        <span className="icon">
                          <i className={handleChangingClasses(field.param)} />
                        </span>
                      </SearchLink>
                    </span>
                  </th>
                ))}
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
          )}

          <tbody>
            {filteringPeople.map(person => {
              const hasMother = findParents(person.motherName || '');
              const hasFather = findParents(person.fatherName || '');

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={
                    person.slug === selectedSlug ? 'has-background-warning' : ''
                  }
                >
                  <td>
                    <PersonLink person={person} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {hasMother ? (
                      <PersonLink person={hasMother} />
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>
                  <td>
                    {hasFather ? (
                      <PersonLink person={hasFather} />
                    ) : (
                      person.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
