import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonType, SortType } from '../types/Person';
import { Person } from './Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: PersonType[];
  selectedPersonSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getNewSearch = (
    oldSort: string | null,
    oldOrder: string | null,
    field: SortType,
  ) => {
    if (oldSort === field && !oldOrder) {
      return { sort: oldSort, order: 'desc' };
    }

    if (oldSort === field && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
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
              <SearchLink
                params={getNewSearch(sort, order, SortType.Name)}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== SortType.Name },
                    { 'fa-sort-up': sort === SortType.Name && !order },
                    {
                      'fa-sort-down': sort === SortType.Name
                    && order === 'desc',
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getNewSearch(sort, order, SortType.Sex)}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas fa-sort',
                    {
                      'fa-sort-up': sort === SortType.Sex && !order,
                      'fa-sort-down': sort === SortType.Sex
                    && order === 'desc',
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getNewSearch(sort, order, SortType.Born)}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== SortType.Born },
                    { 'fa-sort-up': sort === SortType.Born && !order },
                    {
                      'fa-sort-down': sort === SortType.Born
                    && order === 'desc',
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getNewSearch(sort, order, SortType.Died)}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== SortType.Died },
                    { 'fa-sort-up': sort === SortType.Died && !order },
                    {
                      'fa-sort-down': sort === SortType.Died
                    && order === 'desc',
                    },
                  )}
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
        {people.map(person => {
          const isMother = people.find(personSearch => {
            return personSearch.name === person.motherName;
          }) || null;

          const isFather = people.find(personSearch => {
            return personSearch.name === person.fatherName;
          }) || null;

          return (
            <Person
              person={person}
              selectedPersonSlug={selectedPersonSlug}
              isMother={isMother}
              isFather={isFather}
            />
          );
        })}
      </tbody>
    </table>
  );
};
