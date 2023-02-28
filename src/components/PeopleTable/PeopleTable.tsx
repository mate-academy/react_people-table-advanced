import cn from 'classnames';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';
import { PersonLink } from '../PersonLink';
import { SortSearchLink } from '../SortSearchLink';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || null;
  const currentCenturies = searchParams.getAll('centuries') || [];
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || null;

  const filteredPeople = useMemo(() => {
    return getFilteredPeople(
      people,
      currentQuery,
      currentSex,
      currentCenturies,
    );
  }, [people, currentQuery, currentSex, currentCenturies]);

  const preparedPeople = useMemo(() => {
    return getSortedPeople(
      filteredPeople,
      currentSort as keyof Person,
      currentOrder,
    );
  }, [filteredPeople, currentSort, currentOrder]);

  if (!filteredPeople.length) {
    return (
      <p>There are no people matching the current search criteria</p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortSearchLink text="Name" />
          <SortSearchLink text="Sex" />
          <SortSearchLink text="Born" />
          <SortSearchLink text="Died" />

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => {
          const {
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
            mother,
            father,
          } = person;

          const isSelectedPerson = selectedSlug === slug;
          const editedMotherName = motherName || '-';
          const editedFatherName = fatherName || '-';

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelectedPerson })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : editedMotherName}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : editedFatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
