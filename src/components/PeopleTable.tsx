/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person, SortOptions } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') === 'desc' ? 'asc' : 'desc';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortOptions).map(option => {
            const isSortedAsc =
              currentSort === option && currentOrder === 'asc';
            const isSortedDesc =
              currentSort === option && currentOrder === 'desc';
            return (
              <th key={option}>
                <SearchLink params={{ sort: option, order: currentOrder }}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSort !== option,
                          'fa-sort-up': isSortedAsc,
                          'fa-sort-down': isSortedDesc,
                        })}
                      />
                    </span>
                  </span>
                </SearchLink>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug: personsSlug,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={personsSlug}
              className={classNames({
                'has-background-warning': personsSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  <p>{motherName || '-'}</p>
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  <p>{fatherName || '-'}</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
