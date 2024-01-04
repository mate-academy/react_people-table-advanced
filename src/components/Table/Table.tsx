import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { PersonRow } from '../PersonRow';
import { SortOrder } from '../../types/SortOrder';
import { SortFields } from '../../types/SortFields';
import { SortIcon } from '../SortIcon';

interface Props {
  displayPeople: Person[];
}

export const Table: React.FC<Props> = ({ displayPeople }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const getSortedParams
      = (newSortType: string): Record<string, string | null> => {
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

  const sortingByHeader = (sortField: SortFields) => (
    <span className="is-flex is-flex-wrap-nowrap">
      {sortField}
      <SearchLink params={getSortedParams(sortField)}>
        <SortIcon sortField={sortField} />
      </SearchLink>
    </span>
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>{sortingByHeader(SortFields.Name)}</th>
          <th>{sortingByHeader(SortFields.Sex)}</th>
          <th>{sortingByHeader(SortFields.Born)}</th>
          <th>{sortingByHeader(SortFields.Died)}</th>
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
