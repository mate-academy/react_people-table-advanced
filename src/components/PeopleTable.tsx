import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonDetails } from './PersonDetails';
import { SortColumns } from './SortColumns';
import { getSortedPeople } from '../services/getSortedPeople';
import { getFilteredPeople } from '../services/getFilteredPeople';
import { useMemo } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

const sortColumns = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const visiblePeople = useMemo(() => {
    return getFilteredPeople(
      people,
      searchParams.get('query'),
      searchParams.get('sex'),
      searchParams.getAll('centuries'),
    );
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    return getSortedPeople(visiblePeople, {
      sortColumn,
      sortOrder,
    });
  }, [visiblePeople, sortColumn, sortOrder]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {visiblePeople.length > 0 ? (
        <>
          <thead>
            <tr>
              {sortColumns.map((column: string) => (
                <SortColumns key={column} column={column} />
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople?.map((person: Person) => (
              <PersonDetails key={person.slug} person={person} />
            ))}
          </tbody>
        </>
      ) : (
        <h1>There are no people matching the current search criteria</h1>
      )}
    </table>
  );
};
