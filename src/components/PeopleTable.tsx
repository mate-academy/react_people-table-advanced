import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { sortOptions } from '../utils/filterSortOptions';

type Props = {
  people: Person[];
};

export const PeopleTable = React.memo(function PeopleTable({ people }: Props) {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const getParent = (child: Person, parent: 'father' | 'mother') => {
    if (!child[`${parent}Name`]) {
      return '-';
    }

    if (!child[parent]) {
      return child[`${parent}Name`];
    }

    return <PersonLink person={child[parent]} />;
  };

  function getToggledSortParams(newValue: string): SearchParams {
    const currentSortValue = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSortValue !== newValue) {
      return { sort: newValue, order: null };
    }

    if (!currentOrder) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  }

  if (people.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortOptions.map(sortOption => (
            <th key={sortOption}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortOption[0].toUpperCase() + sortOption.slice(1)}
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      getToggledSortParams(sortOption),
                    ),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': searchParams.get('sort') !== sortOption,
                        'fa-sort-up':
                          searchParams.get('sort') === sortOption &&
                          !searchParams.get('order'),
                        'fa-sort-down':
                          searchParams.get('sort') === sortOption &&
                          searchParams.get('order'),
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParent(person, 'mother')}</td>
            <td>{getParent(person, 'father')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
