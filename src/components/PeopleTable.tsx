/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { PersonalLink } from './PersonalLink';
import { SearchLink } from './SearchLink';
import React from 'react';

type Props = {
  people: Person[];
  selectedSlug?: string;
  sort?: string | null;
  order?: string | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sort,
  order,
}) => {
  const getSortParams = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (!order) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink params={getSortParams('name')}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink params={getSortParams('sex')}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink params={getSortParams('born')}>
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink params={getSortParams('died')}>
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
          {people.map(person => {
            const mother = people.find(p => p.name === person.motherName);
            const father = people.find(p => p.name === person.fatherName);

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={
                  person.slug === selectedSlug ? 'has-background-warning' : ''
                }
              >
                <td>
                  <PersonalLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {mother ? (
                    <PersonalLink person={mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {father ? (
                    <PersonalLink person={father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
