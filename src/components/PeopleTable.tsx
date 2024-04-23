import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;

  const order = searchParams.get('order') || null;

  const handleChangeSort = (newSortParam: string): SearchParams => {
    if (!newSortParam) {
      return { sort: newSortParam };
    }

    if (newSortParam !== sort) {
      return { sort: newSortParam, order: null };
    }

    if (!order) {
      return { order: 'desc' };
    }

    if (newSortParam && order) {
      return { sort: null, order: null };
    }

    return { sort: newSortParam, order: null };
  };

  const handleChangeClass = (param: string) => {
    if (param === sort && order === 'desc') {
      return classNames('fas fa-sort-down');
    }

    if (param === sort) {
      return classNames('fas fa-sort-up');
    }

    return classNames('fas fa-sort');
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
              <SearchLink params={handleChangeSort('name')}>
                <span className="icon">
                  <i className={handleChangeClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleChangeSort('sex')}>
                <span className="icon">
                  <i className={handleChangeClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleChangeSort('born')}>
                <span className="icon">
                  <i className={handleChangeClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleChangeSort('died')}>
                <span className="icon">
                  <i className={handleChangeClass('died')} />
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
          <PersonLink key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
