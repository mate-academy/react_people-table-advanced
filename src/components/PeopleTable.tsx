import { useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

type SortType = 'name' | 'sex' | 'born' | 'died';

const THEADS_TO_SORT: SortType[] = ['name', 'sex', 'born', 'died'];

type SortOrder = 'asc' | 'desc' | 'default';

function findPersonByName(name: string | null, people: Person[]) {
  return people.find(person => person.name === name);
}

function sortPeople(
  filteredPeople: Person[],
  sortBy: SortType,
  sortingOrder: SortOrder,
): Person[] {
  if (sortingOrder === 'default') {
    return filteredPeople;
  }

  return filteredPeople.toSorted((person1, person2) => {
    let result = 0;

    if (typeof person1[sortBy] === 'string') {
      result = person1[sortBy].localeCompare(person2[sortBy]);
    }

    if (typeof person1[sortBy] === 'number') {
      result = person1[sortBy] - person2[sortBy];
    }

    return sortingOrder === 'asc' ? result : result * -1;
  });
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [sortState, setSortState] = useState<{
    type: SortType | null;
    order: 'asc' | 'desc';
  }>({
    type: null,
    order: 'asc',
  });

  const { personSlug } = useParams();
  const navigate = useNavigate();

  function handleSortClick(sortBy: SortType) {
    let order = 'asc';

    if (sortState.type === sortBy) {
      order = sortState.order === 'asc' ? 'desc' : 'asc';
    }

    setSortState({ type: sortBy, order });

    const sortParams = `sort=${sortBy}&order=${order}`;

    navigate(`/people/${personSlug}?${sortParams}`);
  }

  function getIconClass(sortBy: SortType) {
    return classNames('fas', {
      'fa-sort':
        sortState.type !== sortBy ||
        (sortState.type === sortBy && sortState.order === 'default'),
      'fa-sort-up': sortState.type === sortBy && sortState.order === 'asc',
      'fa-sort-down': sortState.type === sortBy && sortState.order === 'desc',
    });
  }

  const sortedPeople = sortPeople(
    people,
    sortState.type || 'Name',
    sortState.order,
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        {THEADS_TO_SORT.map(THEAD => (
          <th key={THEAD}>
            <span className="is-flex is-flex-wrap-nowrap">
              {THEAD}
              <a href="#/people?sort=name">
                <span className="icon" onClick={() => handleSortClick(THEAD)}>
                  <i className={getIconClass(THEAD)} />
                </span>
              </a>
            </span>
          </th>
        ))}

        <th>Mother</th>
        <th>Father</th>
      </thead>
      <tbody>
        {sortedPeople.map(person => {
          const mother = findPersonByName(person.motherName, people);
          const father = findPersonByName(person.fatherName, people);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === personSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
