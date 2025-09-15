/* eslint-disable prettier/prettier */
import React, { useMemo } from 'react';
import { Person } from '../types/Person';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { peopleSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const orderDirection = searchParams.get('order');

  const getNextSortParams = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (orderDirection === null) {
      return { sort: field, order: 'desc' };
    }

    if (orderDirection === 'desc') {
      return { sort: null, order: null }; // сброс сортировки
    }

    return { sort: field, order: null };
  };

  const sortedPeople: Person[] = useMemo(() => {
    const peopleToSort = [...people];

    switch (sortField) {
      case 'sex':
      case 'name':
        peopleToSort.sort((person1, person2) =>
          person1[sortField].localeCompare(person2[sortField]),
        );
        break;
      case 'born':
      case 'died':
        peopleToSort.sort(
          (person1, person2) => person1[sortField] - person2[sortField],
        );
        break;
      default:
        break;
    }

    return orderDirection ? peopleToSort.reverse() : peopleToSort;
  }, [people, sortField, orderDirection]);

  const getClassName = (field: string) => {
    return classNames(
      'fas',
      { 'fa-sort': sortField !== field },
      {
        'fa-sort-up ': sortField === field && orderDirection !== 'desc',
      },
      {
        'fa-sort-down': sortField === field && orderDirection === 'desc',
      },
    );
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
                  <i className={getClassName('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')}>
                <span className="icon">
                  <i className={getClassName('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')}>
                <span className="icon">
                  <i
                    className={getClassName('born')}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')}>
                <span className="icon">
                  <i className={getClassName('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': peopleSlug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
