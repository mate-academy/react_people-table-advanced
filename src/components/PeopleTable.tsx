/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { PersonLink } from './PersonLink';

import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

const fields = [
  { title: 'Name', query: 'name' },
  { title: 'Sex', query: 'sex' },
  { title: 'Born', query: 'born' },
  { title: 'Died', query: 'died' },
  { title: 'Mother' },
  { title: 'Father' },
];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort');
  const orderBy = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {fields.map(field => (
            <th key={field.title}>
              {field.query ? (
                <span className="is-flex is-flex-wrap-nowrap">
                  {field.title}

                  <SearchLink
                    params={{
                      sort: (sortField === field.query && orderBy)
                        ? null
                        : field.query,
                      order: (orderBy || sortField !== field.query)
                        ? null
                        : 'desc',
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !sortField || sortField !== field.query,
                          'fa-sort-up': sortField === field.query && !orderBy,
                          'fa-sort-down': sortField === field.query && orderBy,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              ) : (
                field.title
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': person.slug === slug })}
          >
            <td><PersonLink person={person} /></td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
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
