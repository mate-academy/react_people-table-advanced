import { useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type SortOrder = 'asc' | 'desc' | 'none';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Person;
    order: SortOrder;
  }>({ key: 'name', order: 'none' });

  const sortByKey = (key: keyof Person) => {
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        if (prevConfig.order === 'none') {
          return { key, order: 'asc' };
        } else if (prevConfig.order === 'asc') {
          return { key, order: 'desc' };
        } else {
          return { key, order: 'none' };
        }
      } else {
        return { key, order: 'asc' };
      }
    });
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (sortConfig.order === 'none') {
      return 0;
    }

    const aKey = a[sortConfig.key] ?? '';
    const bKey = b[sortConfig.key] ?? '';

    if (aKey < bKey) {
      return sortConfig.order === 'asc' ? -1 : 1;
    }

    if (aKey > bKey) {
      return sortConfig.order === 'asc' ? 1 : -1;
    }

    return 0;
  });

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
              onClick={() => sortByKey('name')}
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
              onClick={() => sortByKey('sex')}
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
              onClick={() => sortByKey('born')}
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
              onClick={() => sortByKey('died')}
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
        {sortedPeople.map(person => (
          <PersonLink person={person} people={people} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
