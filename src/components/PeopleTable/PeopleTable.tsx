import React from 'react';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';
import { handleSort } from '../../utils/handleSort';
import { getLinkClass } from '../../utils/getLinkClass';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const getPeopleSlug = (parentName: string): Person | undefined => {
    return people.find(person => person.name === parentName);
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
              <SearchLink params={handleSort('name', searchParams)}>
                <span className="icon">
                  <i className={getLinkClass('name', searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSort('sex', searchParams)}>
                <span className="icon">
                  <i className={getLinkClass('sex', searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSort('born', searchParams)}>
                <span className="icon">
                  <i className={getLinkClass('born', searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSort('died', searchParams)}>
                <span className="icon">
                  <i className={getLinkClass('died', searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            person={person}
            key={person.slug}
            getPeopleSlug={getPeopleSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
