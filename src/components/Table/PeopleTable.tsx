import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { PeopleTableHeader } from './PeopleTableHeader';
import { useSearchParams } from 'react-router-dom';
import { SORT_DESC } from '../../constants';
import { useEffect, useState } from 'react';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string | undefined;
}

const sortPeople = (people: Person[], search: URLSearchParams) => {
  const sortField = search.get('sort')?.toLocaleLowerCase() ?? '';
  const sortOrder = search.get('order')?.toLocaleLowerCase() ?? '';

  if (!sortField) {
    return people;
  }

  const sortedPeople = [...people];

  switch (true) {
    case sortField === 'name' || sortField === 'sex':
      sortedPeople.sort((person1, person2) =>
        person1[sortField].localeCompare(person2[sortField]),
      );

      if (sortOrder === SORT_DESC) {
        sortedPeople.reverse();
      }

      return sortedPeople;

    case sortField === 'born' || sortField === 'died':
      sortedPeople.sort(
        (person1, person2) => +person1[sortField] - person2[sortField],
      );

      if (sortOrder === SORT_DESC) {
        sortedPeople.reverse();
      }

      return sortedPeople;
    default:
      return people;
  }
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  const [search] = useSearchParams();
  const [sortedPeople, setSortedPeople] = useState(people);

  useEffect(() => {
    setSortedPeople(sortPeople(people, search));
  }, [people, search]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeader />
      <tbody>
        {sortedPeople.map((person: Person) => {
          const {
            sex,
            born,
            died,
            slug,
            fatherName,
            motherName,
            father,
            mother,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : (motherName ?? '-')}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : (fatherName ?? '-')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
