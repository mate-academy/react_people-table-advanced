/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortingParamsSwitcher = (sortBy: string): string => {
    const isOrderDesc = searchParams.has('order');
    const currentSortBy = searchParams.get('sort');

    if (currentSortBy === sortBy && isOrderDesc) {
      return getSearchWith(searchParams, { sort: null, order: null });
    }

    if (currentSortBy === sortBy && !isOrderDesc) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: sortBy, order: null });
  };

  const decorateWithSortingArrow = (
    columnName: string,
    paramName = columnName.toLowerCase(),
  ) => {
    return (
      <span className="is-flex is-flex-wrap-nowrap">
        {columnName}
        <Link
          to={{
            search: sortingParamsSwitcher(paramName),
          }}
        >
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': searchParams.get('sort') !== paramName,
                'fa-sort-up':
                  !searchParams.has('order') &&
                  searchParams.get('sort') === paramName,
                'fa-sort-down':
                  searchParams.has('order') &&
                  searchParams.get('sort') === paramName,
              })}
            ></i>
          </span>
        </Link>
      </span>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>{decorateWithSortingArrow('Name')}</th>
          <th>{decorateWithSortingArrow('Sex')}</th>
          <th>{decorateWithSortingArrow('Born')}</th>
          <th>{decorateWithSortingArrow('Died')}</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
