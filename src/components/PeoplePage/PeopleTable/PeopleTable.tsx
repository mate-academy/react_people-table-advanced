import React from 'react';
import { Person } from '../../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { FilterPeople } from '../../../functions/FilterPeople';
import { paramsForSearch } from '../../../utils/paramsForSearch';
import { SearchLink } from '../../../SearchLink';
import { SortParams } from '../../../types/sortParams';

type Propse = {
  people: Person[];
};

export const PeopleTable: React.FC<Propse> = ({ people }) => {
  const filteredPeople = FilterPeople(people);
  const { activePersonSlug } = useParams();

  const [searchParams] = useSearchParams();

  const activeSort =
    searchParams.get(paramsForSearch.Sort) || paramsForSearch.None;
  const activeOrder =
    searchParams.get(paramsForSearch.Order) || paramsForSearch.None;

  const getSortParams = (newSort: string) => {
    if (activeSort !== newSort) {
      return { sort: newSort, order: null };
    }

    if (!activeOrder) {
      return { sort: newSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (newSort: string) => {
    if (activeSort !== newSort) {
      return 'fa-sort';
    }

    return activeOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  if (!filteredPeople) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortParams).map(value => {
            const normalisedValue = value.toLowerCase();

            return (
              <th key={normalisedValue}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <SearchLink params={getSortParams(normalisedValue)}>
                    <span className="icon">
                      <i className={`fas ${getSortIcon(normalisedValue)}`} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === activePersonSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother ? (
              <td>
                <PersonLink person={person.mother} />
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}
            {person.father ? (
              <td>
                <PersonLink person={person.father} />
              </td>
            ) : (
              <td>{person.fatherName || '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
