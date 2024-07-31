import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Person } from '../types';
import { FC } from 'react';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { filterPeopleBy } from '../utils/FilterPeopleBy';
import { SortField } from '../types/SortField';
import { SexEnum } from '../components/SexEnum';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  persons: Person[];
};

const mapSexToEnum = (sex: string | null): SexEnum | null => {
  switch (sex) {
    case SexEnum.Male:
      return SexEnum.Male;
    case SexEnum.Female:
      return SexEnum.Female;
    default:
      return null;
  }
};

export const PeopleTable: FC<Props> = ({ persons }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sex = mapSexToEnum(searchParams.get('sex'));
  const sortField = searchParams.get('sort') as keyof Person;
  const sortOrder = searchParams.get('order') || 'asc';
  const filteredPeople = filterPeopleBy(persons, centuries, query, sex);

  let sortedPeople = [...filteredPeople];

  if (sortField) {
    sortedPeople = sortedPeople.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }
      }

      return 0;
    });
  }

  const getNextSortingParams = (field: SortField): SearchParams => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        return { sort: field, order: 'desc' };
      }

      if (sortOrder === 'desc') {
        return { sort: null, order: null };
      }
    }

    return { sort: field };
  };

  const getSortIcon = (field: string) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    }

    return 'fa-sort';
  };

  return filteredPeople.length !== 0 ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getNextSortingParams('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortingParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortingParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortingParams('died')}>
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
        {sortedPeople.map(person => (
          <tr
            key={uuidv4()}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                persons.find(p => p.name === person.motherName) ? (
                  <PersonLink
                    person={persons.find(p => p.name === person.motherName)}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                persons.find(p => p.name === person.fatherName) ? (
                  <PersonLink
                    person={persons.find(p => p.name === person.fatherName)}
                  />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no people matching the current search criteria</p>
  );
};
