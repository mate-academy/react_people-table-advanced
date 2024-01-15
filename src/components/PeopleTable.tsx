import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]
};

const sortedFields = ['Name', 'Sex', 'Born', 'Died'];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sortField !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (sortField === field && !isReversed) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const peopleDuplication = [...people].map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return { ...person, mother, father };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortedFields.map(field => {
            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field}
                  <SearchLink
                    params={getSortParams(field)}
                  >
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': sortField !== field,
                        'fa-sort-up': sortField === field && !isReversed,
                        'fa-sort-down': sortField === field && isReversed,
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
        {peopleDuplication.map((person) => {
          const { slug } = person;

          return (
            <PersonLink key={slug} person={person} />
          );
        })}
      </tbody>
    </table>
  );
};
