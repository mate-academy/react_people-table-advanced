import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { SORT_OPTIONS, TABLE_HEADERS } from '../utils/constants';
import { getSortOptionClass, normalizeString } from '../utils/helpers';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();
  const [sortParams] = useSearchParams();
  const sortOption = sortParams.get('sort') || null;
  const sortOrder = sortParams.get('order') || null;

  const toggleSort = (header: string) => {
    const newSortOption = normalizeString(header);
    let newSortParams = {};

    if (sortOption !== newSortOption) {
      newSortParams = {
        sort: normalizeString(newSortOption),
        order: null,
      };
    } else if (!sortOrder) {
      newSortParams = {
        sort: sortOption,
        order: 'desc',
      };
    } else {
      newSortParams = {
        sort: null,
        order: null,
      };
    }

    return newSortParams;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table
  is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADERS.map(header => (
            <th key={header}>
              {SORT_OPTIONS.includes(header) ? (
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  <SearchLink
                    params={toggleSort(header)}
                  >
                    <span className="icon">
                      <i className={getSortOptionClass(
                        sortOption,
                        sortOrder,
                        header,
                      )}
                      />
                    </span>
                  </SearchLink>
                </span>
              ) : (
                header
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            isSelected={person.slug === selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
