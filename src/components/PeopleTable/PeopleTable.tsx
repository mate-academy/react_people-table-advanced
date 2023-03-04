import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types/Person';
import { PersonLink } from './PersonLink';
import { getVisiblePeople } from '../../utils/getVisiblePeople';
import { SortLink } from '../SortLink';

type Props = {
  selectedPersonSlug: string;
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  selectedPersonSlug,
  people,
}) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const sexParam = searchParams.get('sex');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort') as keyof Person;
  const isReversed = searchParams.get('order') === 'desc';

  const visiblePeople = useMemo(() => (
    getVisiblePeople(people, centuries, sexParam, query, sort, isReversed)
  ), [people, centuries, sexParam, query, sort, isReversed]);

  const isPeopleTableEmpty = Boolean(!visiblePeople.length);

  if (isPeopleTableEmpty) {
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
        {visiblePeople.map(person => {
          const {
            sex, born, died, motherName, fatherName, slug, mother, father,
          } = person;

          const isSelected = slug === selectedPersonSlug;

          const personMotherName = motherName || '-';
          const personFatherName = fatherName || '-';

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {!mother ? personMotherName : <PersonLink person={mother} />}
              </td>
              <td>
                {!father ? personFatherName : <PersonLink person={father} />}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
