import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';

import { PersonRow } from '../PersonRow';
import { SearchLink } from '../SearchLink';

import { Person } from '../../types/Person';
import { SortBy } from '../../enums/SortBy';
import { SearchParam } from '../../enums/SearchParam';

type Props = {
  people: Person[];
};

const fieldsToSort = Object
  .values(SortBy)
  .filter((sortBy) => sortBy !== SortBy.None);

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  const { slug: selectedSlug = '' } = useParams();
  const [searchParams] = useSearchParams();

  const selectedSort = (searchParams.get(SearchParam.Sort) || '') as SortBy;
  const selectedOrder = searchParams.get(SearchParam.Order) || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {fieldsToSort.map((fieldName) => (
            <th key={fieldName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {capitalizeFirstLetter(fieldName)}

                <SearchLink
                  params={{
                    [SearchParam.Sort]:
                      fieldName === selectedSort && selectedOrder
                        ? null
                        : fieldName,
                    [SearchParam.Order]:
                      fieldName === selectedSort && !selectedOrder
                        ? 'desc'
                        : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': fieldName !== selectedSort,
                        'fa-sort-up':
                          fieldName === selectedSort && !selectedOrder,
                        'fa-sort-down':
                          fieldName === selectedSort && selectedOrder,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonRow
            key={person.slug}
            person={person}
            selectedSlug={selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
});
