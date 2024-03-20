import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';

interface PeopleTableProps {
  people: Person[];
}

type SearchParams = {
  sort: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: string): SearchParams => {
    if (sort === field && order === 'asc') {
      return { sort: field, order: 'desc' };
    }

    if (sort === field && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field, order: 'asc' };
  };

  const getIconClassName = (field: string): string => {
    if (sort === field) {
      if (order === 'asc') {
        return 'fas fa-sort-up';
      }

      if (order === 'desc') {
        return 'fas fa-sort-down';
      }
    }

    return 'fa fa-sort';
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getIconClassName('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getIconClassName('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getIconClassName('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getIconClassName('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink key={person.slug} people={people} person={person} />
        ))}
      </tbody>
    </table>
  );
};
