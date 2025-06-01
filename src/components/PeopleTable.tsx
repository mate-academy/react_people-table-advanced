import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const findPersonBySlug = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name);
  };

  const getSortIcon = (field: string) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const getSortParams = (field: string): SearchParams => {
    if (currentSort !== field) {
      return { sort: field };
    }

    if (currentOrder === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field, order: 'desc' };
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
              <Link
                to={`/people?${getSearchWith(searchParams, getSortParams('name'))}`}
                className="icon"
              >
                <i className={`fas ${getSortIcon('name')}`} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={`/people?${getSearchWith(searchParams, getSortParams('sex'))}`}
                className="icon"
              >
                <i className={`fas ${getSortIcon('sex')}`} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={`/people?${getSearchWith(searchParams, getSortParams('born'))}`}
                className="icon"
              >
                <i className={`fas ${getSortIcon('born')}`} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={`/people?${getSearchWith(searchParams, getSortParams('died'))}`}
                className="icon"
              >
                <i className={`fas ${getSortIcon('died')}`} />
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            findPersonBySlug={findPersonBySlug}
          />
        ))}
      </tbody>
    </table>
  );
};
