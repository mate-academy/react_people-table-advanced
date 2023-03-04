import React from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';
import { SortLink } from '../SortLink';

interface Props {
  people: Person[];
  slug: string;
}
export const PeopleTable: React.FC<Props> = ({
  people,
  slug,
}) => {
  return (
    people.length === 0
      ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable
            is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <SortLink sortBy="name" />
              </th>

              <th>
                <SortLink sortBy="sex" />
              </th>

              <th>
                <SortLink sortBy="born" />
              </th>

              <th>
                <SortLink sortBy="died" />
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              const mother = people.find(human => (
                human.name === person.motherName)) || null;

              const father = people.find(human => (
                human.name === person.fatherName)) || null;

              return (
                <PersonItem
                  person={person}
                  key={person.slug}
                  slugId={slug}
                  mother={mother}
                  father={father}
                />
              );
            })}
          </tbody>
        </table>
      )
  );
};
