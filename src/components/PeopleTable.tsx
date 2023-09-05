import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortBy } from '../types/SortBy';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  preperedPeople: Person[]
};

export const PeopleTable: React.FC<Props> = ({ preperedPeople }) => {
  const [searchParams] = useSearchParams();

  const getSort = searchParams.get('sort');
  const getOrder = searchParams.get('order');

  const handleClick = (sort: SortBy) => {
    if (!getSort && !getOrder) {
      return getSearchWith(searchParams, { sort });
    }

    if (getSort && !getOrder) {
      return getSearchWith(searchParams, { sort: getSort, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const getLinkClass = (value: string) => {
    return classNames('fas', {
      'fa-sort': !getSort || getSort !== value,
      'fa-sort-up': getSort === value && !getOrder,
      'fa-sort-down': getSort === value && getOrder,
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
              <Link
                to={{ search: handleClick(SortBy.Name) }}
              >
                <span className="icon">
                  <i className={getLinkClass(SortBy.Name)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{ search: handleClick(SortBy.Sex) }}
              >
                <span className="icon">
                  <i className={getLinkClass(SortBy.Sex)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleClick(SortBy.Born) }}>
                <span className="icon">
                  <i className={getLinkClass(SortBy.Born)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleClick(SortBy.Died) }}>
                <span className="icon">
                  <i className={getLinkClass(SortBy.Died)} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preperedPeople.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
