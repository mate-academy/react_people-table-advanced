import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { filterBy } from '../utils/filterBy';
import { sortBy } from '../utils/sortBy';
import { SortColumns } from './sorter/SortColumns';

type Props = {
  people: Person[];
  slug: string | undefined;
  Parent: (parentName: string | null) => string | JSX.Element;
};

const SORT_COLUMNS = ['Name', 'Sex', 'Born', 'Died'];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, slug, Parent }) => {
  const [searchParams] = useSearchParams();

  const filteredPeople = filterBy(
    people,
    searchParams.get('query'),
    searchParams.get('sex'),
    searchParams.getAll('centuries'),
  );

  const sortedPeople = sortBy(
    filteredPeople,
    searchParams.get('sort') || '',
    searchParams.get('order') || '',
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {sortedPeople.length > 0 && (
        <>
          <thead>
            <tr>
              {SORT_COLUMNS.map((column: string) => (
                <SortColumns key={column} column={column} />
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={slug === person.slug ? 'has-background-warning' : ''}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{Parent(person.motherName)}</td>
                <td>{Parent(person.fatherName)}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}

      {sortedPeople.length === 0 && (
        <h1>There are no people matching the current search criteria</h1>
      )}
    </table>
  );
};
