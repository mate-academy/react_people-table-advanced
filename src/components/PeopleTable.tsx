import classNames from 'classnames';
import React from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Column } from '../types/Column';
import { ParentLink } from './ParentLink';
import { SearchLink } from './SearchLink';

const columns: Column[] = [
  { name: 'Name', sortField: 'name', id: 1 },
  { name: 'Sex', sortField: 'sex', id: 2 },
  { name: 'Born', sortField: 'born', id: 3 },
  { name: 'Died', sortField: 'died', id: 4 },
];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findParent = (personName: string | null) => {
    const parent = people.find(person => person.name === personName);

    if (parent) {
      return (
        <ParentLink parent={parent} />
      );
    }

    return personName || '-';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({
            name,
            sortField,
            id,
          }) => (
            <th key={id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {name}
                <SearchLink params={{
                  sort: !sortBy || !order ? sortField : null,
                  order: sortBy && !order ? 'desc' : null,
                }}
                >
                  <span className="icon">
                    <i className={classNames(
                      'fas',
                      { 'fa-sort': sortBy !== sortField },
                      { 'fa-sort-up': sortBy === sortField && !order },
                      { 'fa-sort-down': sortBy === sortField && order },
                    )}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames(
              { 'has-background-warning': person.slug === personSlug },
            )}
          >
            <td>
              <NavLink
                to={`/people/${person.slug}`}
                className={() => classNames(
                  'link',
                  { 'has-text-danger': person.sex === 'f' },
                )}
              >
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findParent(person.motherName)}</td>
            <td>{findParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
