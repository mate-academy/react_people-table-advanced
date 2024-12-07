import { useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { sortByKey } from '../utils/sortByKey';
import { sortPeople } from '../utils/sortPeopleTable';

type SortOrder = 'asc' | 'desc' | 'none';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Person;
    order: SortOrder;
  }>({ key: 'name', order: 'none' });

  const getIconClass = (key: keyof Person) => {
    if (sortConfig.key !== key) {
      return 'fas fa-sort';
    }

    if (sortConfig.order === 'asc') {
      return 'fas fa-sort-up';
    }

    if (sortConfig.order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => sortByKey('name', setSortConfig)}
            >
              Name
              <span className="icon">
                <i className={getIconClass('name')} />
              </span>
            </span>
          </th>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => sortByKey('sex', setSortConfig)}
            >
              Sex
              <span className="icon">
                <i className={getIconClass('sex')} />
              </span>
            </span>
          </th>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => sortByKey('born', setSortConfig)}
            >
              Born
              <span className="icon">
                <i className={getIconClass('born')} />
              </span>
            </span>
          </th>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => sortByKey('died', setSortConfig)}
            >
              Died
              <span className="icon">
                <i className={getIconClass('died')} />
              </span>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortPeople(people, sortConfig).map(person => (
          <PersonLink person={person} people={people} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
