import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonRow';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const changeSortParam = (field: string): string => {
    const currSortField = searchParams.get('sort');

    if (currSortField !== field) {
      return getSearchWith(searchParams, { sort: field, order: null });
    }

    if (currSortField === field && !searchParams.has('order')) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const getClassArrow = (field: string) => {
    const currSortField = searchParams.get('sort');

    return classNames('fas', {
      'fa-sort': currSortField !== field,
      'fa-sort-up': currSortField === field && !searchParams.has('order'),
      'fa-sort-down': currSortField === field && searchParams.has('order'),
    });
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
              <Link to={{ search: changeSortParam('name') }}>
                <span className="icon">
                  <i className={getClassArrow('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: changeSortParam('sex') }}>
                <span className="icon">
                  <i className={getClassArrow('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: changeSortParam('born') }}>
                <span className="icon">
                  <i className={getClassArrow('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: changeSortParam('died') }}>
                <span className="icon">
                  <i className={getClassArrow('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
