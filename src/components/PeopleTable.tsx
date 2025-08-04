import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface TableProps {
  people: Person[] | null;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<TableProps> = ({ people }) => {
  const { slug: selectedSlug } = useParams<{ slug?: string }>();

  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getNextSortParams = (
    field: string,
  ): { sort: string | null; order: string | null } => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    } else if (!currentOrder) {
      return { sort: field, order: 'desc' };
    } else {
      return { sort: null, order: null };
    }
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
              <SearchLink params={getNextSortParams('name')}>
                <span className="icon">
                  {currentSort === 'name' ? (
                    currentOrder === 'desc' ? (
                      <i className="fas fa-sort-down" />
                    ) : (
                      <i className="fas fa-sort-up" />
                    )
                  ) : (
                    <i className="fas fa-sort" />
                  )}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')}>
                <span className="icon">
                  {currentSort === 'sex' ? (
                    currentOrder === 'desc' ? (
                      <i className="fas fa-sort-down" />
                    ) : (
                      <i className="fas fa-sort-up" />
                    )
                  ) : (
                    <i className="fas fa-sort" />
                  )}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')}>
                <span className="icon">
                  {currentSort === 'born' ? (
                    currentOrder === 'desc' ? (
                      <i className="fas fa-sort-down" />
                    ) : (
                      <i className="fas fa-sort-up" />
                    )
                  ) : (
                    <i className="fas fa-sort" />
                  )}
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')}>
                <span className="icon">
                  {currentSort === 'died' ? (
                    currentOrder === 'desc' ? (
                      <i className="fas fa-sort-down" />
                    ) : (
                      <i className="fas fa-sort-up" />
                    )
                  ) : (
                    <i className="fas fa-sort" />
                  )}
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} name={person.name}></PersonLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  person={people.find(p => p.name === person.motherName)}
                  name={person.motherName}
                />
              ) : (
                '-'
              )}
            </td>

            <td>
              {person.fatherName ? (
                <PersonLink
                  person={people.find(p => p.name === person.fatherName)}
                  name={person.fatherName}
                />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
