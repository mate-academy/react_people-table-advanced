import React from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[]
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const visiblePeople = [...people];

  const getParamsWithSort = (sortBy: string) => {
    if (sort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!isReversed) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  if (sort) {
    visiblePeople.sort(
      (a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);

          case 'born':
          case 'died':
            return a.born - b.born;

          default:
            return 0;
        }
      },
    );
  }

  if (isReversed) {
    visiblePeople.reverse();
  }

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
                params={getParamsWithSort('name')}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !isReversed,
                      'fa-sort-down': sort === 'name' && isReversed,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getParamsWithSort('sex')}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !isReversed,
                      'fa-sort-down': sort === 'sex' && isReversed,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getParamsWithSort('born')}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !isReversed,
                      'fa-sort-down': sort === 'born' && isReversed,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getParamsWithSort('died')}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !isReversed,
                      'fa-sort-down': sort === 'died' && isReversed,
                    })}
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
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>

            <td>{person.born}</td>

            <td>{person.died}</td>

            <td>
              {person.mother
                ? (
                  <PersonLink person={person.mother} />
                )
                : <p>{person.motherName}</p>}
              {!person.motherName && '-' }
            </td>

            <td>
              {person.father
                ? (
                  <PersonLink person={person.father} />
                )
                : <p>{person.fatherName}</p>}
              {!person.fatherName && '-' }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
