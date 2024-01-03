import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { SearchLink } from '../SearchLink';
import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[]
  loading: boolean;
  error: boolean;
  displayPeople: Person[]
}

export const Table: React.FC<Props> = ({
  loading,
  error,
  displayPeople,
  people,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const getSortedParams = (
    newSortType: string,
  ): Record<string, string | null> => {
    if (sort !== newSortType) {
      return {
        sort: newSortType,
        sortOrder: 'ASC',
      };
    }

    if (sort === newSortType && sortOrder === 'ASC') {
      return { sortOrder: 'DESC' };
    }

    return {
      sort: null,
      sortOrder: null,
    };
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
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
              <SearchLink params={getSortedParams('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && sortOrder === 'ASC',
                      'fa-sort-down': sort === 'name' && sortOrder === 'DESC',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortedParams('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && sortOrder === 'ASC',
                      'fa-sort-down': sort === 'sex' && sortOrder === 'DESC',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortedParams('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && sortOrder === 'ASC',
                      'fa-sort-down': sort === 'born' && sortOrder === 'DESC',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortedParams('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && sortOrder === 'ASC',
                      'fa-sort-down': sort === 'died' && sortOrder === 'DESC',
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
        {displayPeople.map((person) => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
