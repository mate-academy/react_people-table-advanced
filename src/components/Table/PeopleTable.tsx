import classNames from 'classnames';
import { Person, SearchParamsNames } from '../../types';
import { PersonLink } from './PersonLink';
import { PeopleTableHeader } from './PeopleTableHeader';
import { useSearchParams } from 'react-router-dom';
import { SORT_DESC } from '../../constants';
import { useEffect, useState } from 'react';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string | undefined;
}

const filterPeople = (people: Person[], searchParams: URLSearchParams) => {
  let filteredPeople = people;
  const sex = searchParams.get(SearchParamsNames.Sex);
  const query = searchParams.get(SearchParamsNames.Query);
  const centuries = searchParams
    .getAll(SearchParamsNames.Centuries)
    .map(century => +century);

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.includes(query),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(
      person =>
        centuries.includes(Math.ceil(person.born / 100)) ||
        centuries.includes(Math.ceil(person.died / 100)),
    );
  }

  return filteredPeople;
};

const sortPeople = (people: Person[], searchParams: URLSearchParams) => {
  const sortField =
    searchParams.get(SearchParamsNames.Sort)?.toLocaleLowerCase() ?? '';
  const sortOrder =
    searchParams.get(SearchParamsNames.Order)?.toLocaleLowerCase() ?? '';

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
  const [searchParams] = useSearchParams();
  const [sortedPeople, setSortedPeople] = useState(people);

  useEffect(() => {
    const filteredPeople = filterPeople(people, searchParams);

    setSortedPeople(sortPeople(filteredPeople, searchParams));
  }, [people, searchParams]);

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
