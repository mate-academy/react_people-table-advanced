import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { PersonRow } from '../PersonRow';
import { SortOrder } from '../../types/SortOrder';
import { SortFields } from '../../types/SortFields';

interface Props {
  displayPeople: Person[]
}

export const Table: React.FC<Props> = ({
  displayPeople,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const getSortedParams = (
    newSortType: string,
  ): Record<string, string | null> => {
    if (sort !== newSortType) {
      return {
        sort: newSortType,
        sortOrder: SortOrder.Asc,
      };
    }

    if (sort === newSortType && sortOrder === SortOrder.Asc) {
      return { sortOrder: SortOrder.Desc };
    }

    return {
      sort: null,
      sortOrder: null,
    };
  };

  const sortingByHeader = (sortField: SortFields) => {
    return (
      <SearchLink params={getSortedParams(sortField)}>
        <span className="icon">
          <i
            className={cn('fas', {
              'fa-sort': sort !== `${sortField}`,
              'fa-sort-up': sort === `${sortField}` && sortOrder === SortOrder.Asc,
              'fa-sort-down': sort === `${sortField}` && sortOrder === SortOrder.Desc,
            })}
          />
        </span>
      </SearchLink>
    );
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
              {sortingByHeader(SortFields.Name)}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {sortingByHeader(SortFields.Sex)}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {sortingByHeader(SortFields.Born)}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {sortingByHeader(SortFields.Died)}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {displayPeople.map((person) => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
