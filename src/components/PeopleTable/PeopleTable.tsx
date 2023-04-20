import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[],
  personSlug: string,
};

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  personSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as keyof Person;
  const isReversed = searchParams.get('order') === 'desc';
  const query = searchParams.get('query');
  const sexFilter = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const visiblePeople = useMemo(() => (
    getFilteredPeople(people, query, sexFilter, centuries)
  ), [people, query, sexFilter, centuries]);

  const sortedPeople = useMemo(() => (
    getSortedPeople(visiblePeople, sort, isReversed)
  ), [visiblePeople, sort, isReversed]);

  if (!sortedPeople.length) {
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
        {sortedPeople.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          const isSelected = slug === personSlug;
          const mother = people.find(mom => mom.name === motherName);
          const father = people.find(dad => dad.name === fatherName);
          const motherChoose = (motherName || '-');
          const fatherChoose = (fatherName || '-');

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {!mother
                  ? (motherChoose)
                  : <PersonLink person={mother} />}
              </td>

              <td>
                {!father
                  ? (fatherChoose)
                  : <PersonLink person={father} />}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
