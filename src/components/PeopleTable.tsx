/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[],
}

const columns = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(col => {
            const param = col.toLowerCase();

            return (
              <th key={col}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {col}
                  {(!sort || sort !== param) && (
                    <SearchLink
                      params={{
                        sort: param,
                        order: null,
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}

                  {(sort === param && !order) && (
                    <SearchLink params={{ order: 'desc' }}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  )}

                  {sort === param && order === 'desc' && (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <tr
            key={person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? (
                  <PersonLink person={person.mother} />
                )
                : person.motherName || '-'}
            </td>

            <td>
              {person.father
                ? (
                  <PersonLink person={person.father} />
                )
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
