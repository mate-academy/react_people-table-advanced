/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  sortPeople,
  handleDirectionChange,
  getSortIconClass,
} from '../../utils';

import { Person, SortOptions } from '../../types';

import { SearchLink, NoResultsMessage, PersonRow } from '../../components';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const gender = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const direction = searchParams.get('direction');

  const sortBy = Object.values(SortOptions);

  const filteredPeople = useMemo(() => {
    let filteringPeople = [...people];

    if (query) {
      const normalizedQuery = query.toLocaleLowerCase();

      filteringPeople = filteringPeople.filter(
        ({ name, motherName, fatherName }) =>
          name.toLocaleLowerCase().includes(normalizedQuery) ||
          motherName?.toLocaleLowerCase().includes(normalizedQuery) ||
          fatherName?.toLocaleLowerCase().includes(normalizedQuery),
      );
    }

    if (gender) {
      filteringPeople = filteringPeople.filter(person => person.sex === gender);
    }

    if (centuries.length) {
      filteringPeople = filteringPeople.filter(person =>
        centuries.includes(
          (Number(person.born.toString().slice(0, 2)) + 1).toString(),
        ),
      );
    }

    return filteringPeople;
  }, [query, gender, centuries, people]);

  const sortedPeople = useMemo(
    () => sortPeople(filteredPeople, sort, direction),
    [direction, filteredPeople, sort],
  );

  return !sortedPeople.length ? (
    <NoResultsMessage />
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortBy.map(option => {
            const normalizedOption = option.toLowerCase();

            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option}
                  <SearchLink
                    params={handleDirectionChange(
                      normalizedOption,
                      sort,
                      direction,
                    )}
                  >
                    <span className="icon">
                      <i
                        className={getSortIconClass(
                          sort,
                          direction,
                          normalizedOption,
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
        {sortedPeople.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
