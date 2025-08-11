import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';

import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedPerson?: Person;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = useCallback(
    (name: string): { sort?: string | null; order?: string | null } => {
      if (name !== sort) {
        return { sort: name };
      }

      if (order) {
        return {
          sort: null,
          order: null,
        };
      }

      return {
        order: 'desc',
      };
    },
    [order, sort],
  );

  const sortedValues = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortedValues.map(value => {
            const loweredValue = value.toLowerCase();

            return (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <SearchLink params={getSortParams(loweredValue)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== loweredValue,
                          'fa-sort-up': sort === loweredValue && !order,
                          'fa-sort-down': sort === loweredValue && order,
                        })}
                      />
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedPerson?.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother && <PersonLink person={person.mother} />}
              {!person.mother && (person.motherName || '-')}
            </td>

            <td>
              {person.father && <PersonLink person={person.father} />}
              {!person.father && (person.fatherName || '-')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
