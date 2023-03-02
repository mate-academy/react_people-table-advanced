import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { preparePeople } from '../../utils/preparePeople';
import { SortType } from '../../types/SortType';
import { SearchLink } from '../SearchLink';
import { TablePerson } from '../TablePerson';

type Props = {
  people: Person[],
  isError: boolean,
  selectedPersonSlug: string,
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({
    people,
    isError,
    selectedPersonSlug,
  }) => {
    const [searchParams] = useSearchParams();
    const currentSex = searchParams.get('sex');
    const searchQuery = searchParams.get('query');
    const currentCenturies = searchParams.getAll('century');
    const sortType = searchParams.get('sort') as SortType;
    const sortOrder = searchParams.get('order');
    const sortTypes = useMemo(() => Object.values(SortType), []);

    const visiblePeople = preparePeople(
      people,
      currentSex,
      searchQuery,
      currentCenturies,
      sortType,
      sortOrder,
    );

    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!people.length) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    if (!visiblePeople.length) {
      return (
        <p>
          There are no people matching the current search criteria
        </p>
      );
    }

    return (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {sortTypes.map(sortBy => {
              const columnName = sortBy[0].toUpperCase() + sortBy.slice(1);
              const isSortedDesc
                = sortType === sortBy && sortOrder === 'desc';
              const isSortedAsc
                = sortType === sortBy && sortOrder !== 'desc';

              return (
                <th key={sortBy}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {columnName}
                    <SearchLink params={{
                      sort: isSortedDesc
                        ? null
                        : sortBy,
                      order: isSortedAsc
                        ? 'desc'
                        : null,
                    }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas fa-sort',
                          {
                            'fa-sort-up': isSortedAsc,
                            'fa-sort-down': isSortedDesc,
                          },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              );
            })}

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => {
            const personMother
              = visiblePeople.find(mother => mother.name === person.motherName)
                || null;

            const personFather
              = visiblePeople.find(father => father.name === person.fatherName)
                || null;

            return (
              <TablePerson
                key={person.slug}
                person={person}
                selectedPersonSlug={selectedPersonSlug}
                mother={personMother}
                father={personFather}
              />
            );
          })}
        </tbody>
      </table>
    );
  },
);
