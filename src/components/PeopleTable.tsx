import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink/PersonLink';
import { Sort } from '../types/Sort';
import { SearchLink } from './SearchLink';
import { Order } from '../types/Order';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const getIconClasses = (value: string) => {
    return classNames(
      'fas',
      {
        'fa-sort': currentSort !== value,
        'fa-sort-up': currentSort === value && !currentOrder,
        'fa-sort-down': currentSort === value && currentOrder === 'desc',
      },
    );
  };

  const definitionSortParams = (newSort: string) => {
    let sortToUpdate = '';
    let orderToUpdate = '';

    if (currentSort !== newSort) {
      sortToUpdate = newSort;
    }

    if (newSort === currentSort && currentOrder !== Order.Desc) {
      sortToUpdate = currentSort;
      orderToUpdate = Order.Desc;
    }

    return { sort: sortToUpdate || null, order: orderToUpdate || null };
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
              <SearchLink params={definitionSortParams(Sort.Name)}>
                <span className="icon">
                  <i className={getIconClasses(Sort.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={definitionSortParams(Sort.Sex)}>
                <span className="icon">
                  <i className={getIconClasses(Sort.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={definitionSortParams(Sort.Born)}>
                <span className="icon">
                  <i className={getIconClasses(Sort.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={definitionSortParams(Sort.Died)}>
                <span className="icon">
                  <i className={getIconClasses(Sort.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
});
