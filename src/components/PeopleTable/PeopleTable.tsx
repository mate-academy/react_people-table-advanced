import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { useLocation, useSearchParams } from 'react-router-dom';

interface Props {
  peopleList: Person[];
}

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const { search } = useLocation();
  const [searchParams] = useSearchParams(search);
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

  const handleSortType = (sortType: string) => {
    if (sortType !== sort && !order) {
      return { sort: sortType, order: null };
    }

    if (sortType === sort && !order) {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const handleSortStyle = (sortType: string) => {
    if (sortType === sort && order) {
      return 'fas fa-sort-down';
    }

    if (sortType === sort && !order) {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort';
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
              <SearchLink params={handleSortType('name')}>
                <span className="icon">
                  <i className={handleSortStyle('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortType('sex')}>
                <span className="icon">
                  <i className={handleSortStyle('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortType('born')}>
                <span className="icon">
                  <i className={handleSortStyle('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortType('died')}>
                <span className="icon">
                  <i className={handleSortStyle('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
