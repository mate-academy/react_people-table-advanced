import React, { useMemo } from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import { Person } from '../../types';
import { SortLink } from '../SortLink';
import { getFilteredPeople, getSortedPeople } from '../../utils';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const { person: selectedPersonSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') as keyof Person;
  const isReversed = searchParams.get('order') === 'desc';
  const query = searchParams.get('query');
  const sexFilter = searchParams.get('sex');
  const centuryFilter = searchParams.getAll('centuries');

  const visiblePeople = useMemo(() => (
    getFilteredPeople(people, query, sexFilter, centuryFilter)
  ), [people, query, sexFilter, centuryFilter]);

  const orderedPeople = useMemo(() => (
    getSortedPeople(visiblePeople, sortBy, isReversed)
  ), [visiblePeople, sortBy, isReversed]);

  if (!orderedPeople.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
              <SortLink sort="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sort="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sort="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sort="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {orderedPeople.map(person => {
          const isSelected = person.slug === selectedPersonSlug;

          return (
            <PersonRow
              key={person.slug}
              person={person}
              isSelected={isSelected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
