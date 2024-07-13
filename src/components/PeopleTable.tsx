import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  selectedPerson: Person | undefined;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
};
export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  searchParams,
  setSearchParams,
  sortOrder,
  setSortOrder,
}) => {
  const getNextSortOrder = (currentOrder: string) => {
    const params = new URLSearchParams(searchParams);

    switch (currentOrder) {
      case 'asc':
        params.set('order', 'desc');
        setSearchParams(params);

        return 'desc';
      case 'desc':
        params.delete('order');
        setSearchParams(params);

        return 'none';
      default:
        return 'asc';
    }
  };

  function handleSortFieldChange(sortField: string) {
    const params = new URLSearchParams(searchParams);

    params.set('sort', sortField);
    setSearchParams(params);
    setSortOrder(getNextSortOrder(sortOrder));

    return Object.fromEntries(params.entries());
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
              <SearchLink params={handleSortFieldChange('name')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortFieldChange('sex')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortFieldChange('born')}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortFieldChange('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames('', {
              'has-background-warning': selectedPerson?.slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother && person.mother.slug ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
