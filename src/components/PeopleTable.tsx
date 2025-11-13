/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { PersonLink } from '../components/PersonLink';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

const nextSortParams = (
  currentSort: string | null,
  currentOrder: string | null,
  field: string,
) => {
  if (currentSort !== field) {
    return { sort: field, order: null };
  }

  if (!currentOrder) {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const renderSortIcon = (field: string) => {
    if (currentSort !== field) {
      return <i className="fas fa-sort" />;
    }

    if (currentOrder === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  };

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
              <SearchLink
                params={nextSortParams(currentSort, currentOrder, 'name')}
              >
                <span className="icon">{renderSortIcon('name')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={nextSortParams(currentSort, currentOrder, 'sex')}
              >
                <span className="icon">{renderSortIcon('sex')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={nextSortParams(currentSort, currentOrder, 'born')}
              >
                <span className="icon">{renderSortIcon('born')}</span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={nextSortParams(currentSort, currentOrder, 'died')}
              >
                <span className="icon">{renderSortIcon('died')}</span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName) ?? null;
          const father = people.find(p => p.name === person.fatherName) ?? null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                selectedSlug === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink person={mother} name={person.motherName} />
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  <PersonLink person={father} name={person.fatherName} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
