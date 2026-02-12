/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  totalPeople: number;
};

export const PeopleTable: React.FC<Props> = ({ people, totalPeople }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const showEmptyMessage = totalPeople > 0 && people.length === 0;

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    if (!order) {
      return 'fa-sort-up';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <div className="column">
      {showEmptyMessage && (
        <p>There are no people matching the current search criteria</p>
      )}

      {people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {['Name', 'Sex', 'Born', 'Died'].map(label => {
                const field = label.toLowerCase();

                return (
                  <th key={field}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {label}
                      <SearchLink params={getSortParams(field)}>
                        <span className="icon">
                          <i className={`fas ${getSortIcon(field)}`} />
                        </span>
                      </SearchLink>
                    </span>
                  </th>
                );
              })}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => {
              const mother = people.find(p => p.name === person.motherName);
              const father = people.find(p => p.name === person.fatherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': person.slug === personSlug,
                  })}
                >
                  <td>
                    <SearchLink
                      params={{}}
                      to={`/people/${person.slug}`}
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                        'has-text-info': person.sex === 'm',
                      })}
                    >
                      {person.name}
                    </SearchLink>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {!person.motherName ? (
                      '-'
                    ) : mother ? (
                      <SearchLink
                        params={{}}
                        to={`/people/${mother.slug}`}
                        className="has-text-danger"
                      >
                        {person.motherName}
                      </SearchLink>
                    ) : (
                      <span className="has-text-danger">
                        {person.motherName}
                      </span>
                    )}
                  </td>
                  <td>
                    {!person.fatherName ? (
                      '-'
                    ) : father ? (
                      <SearchLink params={{}} to={`/people/${father.slug}`}>
                        {person.fatherName}
                      </SearchLink>
                    ) : (
                      <span>{person.fatherName}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
