/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types';
import { SinglePerson } from './SinglePerson';
import { SortLink } from './SortLink';
import { Sort } from '../types/Sort';

type Props = {
  people: Person[];
};

function sortTitle(insert: string) {
  const insertArray = insert.split('');
  const [first, ...elseLetters] = insertArray;

  return [first.toUpperCase(), elseLetters.join('')].join('');
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  if (!people.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {sortTitle(Sort.Name)}
              <SortLink field={Sort.Name} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {sortTitle(Sort.Sex)}
              <SortLink field={Sort.Sex} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {sortTitle(Sort.Born)}
              <SortLink field={Sort.Born} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {sortTitle(Sort.Died)}
              <SortLink field={Sort.Died} />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <SinglePerson person={person} people={people} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
