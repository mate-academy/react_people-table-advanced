import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[] | null;
  sort: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
}) => {
  const handleSortParams = (sortValue: string) => {
    if (sortValue !== sort) {
      return {
        sort: sortValue,
        order: null,
      };
    }

    if (order === 'desc') {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: sortValue,
      order: 'desc',
    };
  };

  const returnClassName = (sortValue: string) => {
    if (sortValue !== sort) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
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
                params={handleSortParams('name')}
              >
                <span className="icon">
                  <i className={returnClassName('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={handleSortParams('sex')}
              >
                <span className="icon">
                  <i className={returnClassName('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={handleSortParams('born')}
              >
                <span className="icon">
                  <i className={returnClassName('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={handleSortParams('died')}
              >
                <span className="icon">
                  <i className={returnClassName('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
