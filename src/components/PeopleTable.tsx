import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const sexParam = searchParams.get('sex');
  const queryParam = (searchParams.get('query') || '').toLowerCase();
  const centuriesParam = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  let visiblePeople = people;

  if (sexParam) {
    visiblePeople = visiblePeople.filter(person => person.sex === sexParam);
  }

  if (queryParam) {
    visiblePeople = visiblePeople.filter(person => {
      const matchesName = person.name.toLowerCase().includes(queryParam);
      const matchesMother = person.motherName?.toLowerCase().includes(queryParam) ?? false;
      const matchesFather = person.fatherName?.toLowerCase().includes(queryParam) ?? false;

      return matchesName || matchesMother || matchesFather;
    });
  }

  if (centuriesParam.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuriesParam.includes(century);
    });
  }

  if (sortField) {
    visiblePeople = [...visiblePeople].sort((a, b) => {
      const valueA = a[sortField as keyof Person];
      const valueB = b[sortField as keyof Person];

      let comparison = 0;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  if (visiblePeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  const getNextSortParams = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (sortOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return 'fa-sort';
    }

    return sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
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
              <SearchLink params={getNextSortParams('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const mother =
            person.mother || people.find(p => p.name === person.motherName);
          const father =
            person.father || people.find(p => p.name === person.fatherName);

          const isSelected = person.slug === slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
