import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getFilteredPeople } from '../../utils/filteredPeople';
import { getSortedPeople } from '../../utils/sortedPeople';
import { SortSearchLink } from '../SortSearchLink';

type Props = {
  people: Person[];
  selectedSlug: string,
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
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
          } = person;

          const isSelected = slug === selectedSlug;

          const mother = people
            .find(personItem => personItem.name === person.motherName);
          const father = people
            .find(personItem => personItem.name === person.fatherName);

          const personMotherName = motherName || '-';
          const personFatherName = fatherName || '-';

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
                {mother
                  ? (
                    <PersonLink person={mother} />
                  ) : (
                    personMotherName
                  )}
              </td>
              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  ) : (
                    personFatherName
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
