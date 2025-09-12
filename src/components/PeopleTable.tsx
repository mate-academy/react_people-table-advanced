import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { SortField } from '../types/SortFields';
import { SortType } from '../types/SortType';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getNewSortParams = (sortField: SortField): SearchParams => {
    if (sort === sortField && order === SortType.Descending) {
      return { sort: null, order: null };
    } else if (sort === sortField) {
      return { sort: sortField, order: SortType.Descending };
    } else {
      return { sort: sortField, order: null };
    }
  };

  const getSortIconClass = (sortType: string) => {
    return cn('fas', {
      'fa-sort': sortType !== sort,
      'fa-sort-up': sortType === sort && !order,
      'fa-sort-down': sortType === sort && order,
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
              <SearchLink params={getNewSortParams(SortField.Name)}>
                <span className="icon">
                  <i className={getSortIconClass(SortField.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNewSortParams(SortField.Sex)}>
                <span className="icon">
                  <i className={getSortIconClass(SortField.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNewSortParams(SortField.Born)}>
                <span className="icon">
                  <i className={getSortIconClass(SortField.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNewSortParams(SortField.Died)}>
                <span className="icon">
                  <i className={getSortIconClass(SortField.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return <PersonLink person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
