/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { getSearchWith } from '../utils/searchHelper';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  people: Person[];
  searchParams: URLSearchParams;
}

export const PeopleTable: FC<Props> = ({ people, searchParams }) => {
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function handleSorting(sortField: string) {
    if (sort !== sortField) {
      return getSearchWith(searchParams, { sort: sortField, order: null });
    } else if (sort === sortField && !order) {
      return getSearchWith(searchParams, { order: 'desc' });
    } else {
      return getSearchWith(searchParams, { order: null, sort: null });
    }
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
              <Link to={{ search: handleSorting('name') }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleSorting('sex') }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleSorting('born') }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleSorting('died') }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return <PersonInfo person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
