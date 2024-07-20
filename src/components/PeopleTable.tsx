/* eslint-disable jsx-a11y/control-has-associated-label */

import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useMemo } from 'react';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { DirectionFilter } from '../types/DirectionFilter';
import { NoResultsMessage } from './NoResultsMessage';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const gender = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const direction = searchParams.get('direction');

  const sortBy = ['Name', 'Sex', 'Born', 'Died'];

  const filteredPeople = useMemo(() => {
    let filteringPeople = [...people];

    if (query) {
      const normalizedQuery = query.toLocaleLowerCase();

      filteringPeople = filteringPeople.filter(
        ({ name, motherName, fatherName }) =>
          name.toLocaleLowerCase().includes(normalizedQuery) ||
          motherName?.toLocaleLowerCase().includes(normalizedQuery) ||
          fatherName?.toLocaleLowerCase().includes(normalizedQuery),
      );
    }

    if (gender) {
      filteringPeople = filteringPeople.filter(person => person.sex === gender);
    }

    if (centuries.length) {
      filteringPeople = filteringPeople.filter(person =>
        centuries.includes(
          (+person.born.toString().slice(0, 2) + 1).toString(),
        ),
      );
    }

    return filteringPeople;
  }, [query, gender, centuries, people]);

  const sortedPeople = useMemo(() => {
    const sortingPeople = [...filteredPeople].sort(
      (firstPerson: Person, secondPerson: Person) => {
        switch (sort) {
          case DirectionFilter.Name:
          case DirectionFilter.Sex:
            return firstPerson[sort].localeCompare(secondPerson[sort]);
          case DirectionFilter.Born:
          case DirectionFilter.Died:
            return firstPerson[sort] - secondPerson[sort];
          default:
            return 0;
        }
      },
    );

    if (direction === 'desc') {
      sortingPeople.reverse();
    }

    return sortingPeople;
  }, [direction, filteredPeople, sort]);

  const handleDirectionChange = (sortName: string) => {
    if (!sort) {
      return { sort: sortName, direction: null };
    }

    if (sortName && !direction) {
      return { sort: sortName, direction: 'desc' };
    }

    if (sortName && direction) {
      return { sort: null, direction: null };
    }

    if (!sortName && !direction) {
      return { sort: null, direction: null };
    }

    return { sort: sortName, direction: null };
  };

  return !sortedPeople.length ? (
    <NoResultsMessage />
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortBy.map(option => {
            const normalizedOption = option.toLowerCase();

            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option}
                  <SearchLink params={handleDirectionChange(normalizedOption)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== normalizedOption,
                          'fa-sort-up': sort === normalizedOption && !direction,
                          'fa-sort-down':
                            sort === normalizedOption && direction === 'desc',
                        })}
                      />
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
        {sortedPeople.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            father,
            mother,
          } = person;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </PersonLink>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <PersonLink className="has-text-danger" person={mother}>
                    {motherName}
                  </PersonLink>
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father}>{fatherName}</PersonLink>
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
