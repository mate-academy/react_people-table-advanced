import { useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { Person, SearchParameters } from '../types';
import { User } from './User';
import { SearchLink } from './SearchLink';
import { NamesColumnsTable } from '../constants/NamesColumnsTable';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  const [searchParams] = useSearchParams();

  const isSorted = searchParams.get(SearchParameters.Sort);
  const isOrdered = searchParams.get(SearchParameters.Order);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {NamesColumnsTable.map((name, index) => {
            const lowercaseName = name.toLowerCase();

            let sortValue = null;
            let orderValue = null;

            if (isSorted && isSorted !== lowercaseName) {
              sortValue = lowercaseName;
            }

            if (isSorted !== lowercaseName || isSorted) {
              sortValue = lowercaseName;
            }

            if (isSorted && isSorted === lowercaseName) {
              orderValue = 'desc';
            }

            if (isSorted && isOrdered) {
              sortValue = null;
              orderValue = null;
            }

            const noSort = isSorted !== lowercaseName;
            const firstSort = isSorted === lowercaseName;
            const reverseSort = firstSort && isOrdered;

            return (
              <th key={name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {name}
                  {(index < 4) && (
                    <SearchLink
                      params={{
                        sort: sortValue,
                        order: orderValue,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': noSort,
                            'fa-sort-up': firstSort && !reverseSort,
                            'fa-sort-down': reverseSort,
                          })}
                        />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          return (
            <User
              key={person.slug}
              person={person}
              selectedUser={slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
