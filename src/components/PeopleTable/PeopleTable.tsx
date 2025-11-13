import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

interface Props {
  people: Person[];
  selectedSlug: string | undefined;
  currentSort: string;
  currentOrder: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  currentSort,
  currentOrder,
}) => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const getPersonByName = (name: string): Person | undefined => {
    return people.find(p => p.name === name);
  };

  const getNextSortParams = (column: string) => {
    if (currentSort !== column) {
      return { sort: column, order: null };
    }

    if (currentOrder === '') {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (column: string) => {
    if (currentSort !== column) {
      return 'fas fa-sort';
    }

    return currentOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const getSortClass = (column: string) => {
    if (currentSort === column) {
      return 'is-active has-background-light';
    }

    return '';
  };

  return (
    <div className="box table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th className={getSortClass('name')}>
              <SearchLink
                params={getNextSortParams('name')}
                className="is-flex is-align-items-center"
              >
                Name
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </th>

            <th className={getSortClass('sex')}>
              <SearchLink
                params={getNextSortParams('sex')}
                className="is-flex is-align-items-center"
              >
                Sex
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </th>

            <th className={getSortClass('born')}>
              <SearchLink
                params={getNextSortParams('born')}
                className="is-flex is-align-items-center"
              >
                Born
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </th>

            <th className={getSortClass('died')}>
              <SearchLink
                params={getNextSortParams('died')}
                className="is-flex is-align-items-center"
              >
                Died
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => {
            const mother = person.motherName
              ? getPersonByName(person.motherName)
              : undefined;
            const father = person.fatherName
              ? getPersonByName(person.fatherName)
              : undefined;

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={cn({
                  'has-background-warning': person.slug === selectedSlug,
                })}
              >
                <td>
                  <PersonLink person={person} searchParams={searchParams} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {mother ? (
                    <PersonLink person={mother} searchParams={searchParams} />
                  ) : person.motherName ? (
                    <span data-cy="motherName">{person.motherName}</span>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <PersonLink person={father} searchParams={searchParams} />
                  ) : person.fatherName ? (
                    <span data-cy="fatherName">{person.fatherName}</span>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
