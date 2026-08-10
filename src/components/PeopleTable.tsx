import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  activePerson?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, activePerson }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getSortSearchWithParams = (field: string) => {
    if (currentSort !== field) {
      return {
        params: { sort: field, order: null },
        icon: 'fa-sort',
      };
    }

    if (currentOrder !== 'desc') {
      return {
        params: { sort: field, order: 'desc' },
        icon: 'fa-sort-up',
      };
    }

    return {
      params: { sort: null, order: null },
      icon: 'fa-sort-down',
    };
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (!currentSort) {
      return 0;
    }

    const valueA = a[currentSort as keyof Person];
    const valueB = b[currentSort as keyof Person];

    let result = 0;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      result = valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      result = valueA - valueB;
    }

    return currentOrder === 'desc' ? -result : result;
  });

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
              <SearchLink params={getSortSearchWithParams('name').params}>
                <span className="icon">
                  <i className="fas fa-sort" />
                  <i
                    className={`fas ${getSortSearchWithParams('name').icon}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortSearchWithParams('sex').params}>
                <span className="icon">
                  <i className="fas fa-sort" />
                  <i className={`fas ${getSortSearchWithParams('sex').icon}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortSearchWithParams('born').params}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                  <i
                    className={`fas ${getSortSearchWithParams('born').icon}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortSearchWithParams('died').params}>
                <span className="icon">
                  <i className="fas fa-sort" />
                  <i
                    className={`fas ${getSortSearchWithParams('died').icon}`}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          const isSelected = person.slug === activePerson;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': isSelected })}
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
