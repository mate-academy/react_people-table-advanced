import { FC, useMemo } from 'react';
import { Person } from '../types';
import { filterPeople } from '../utils/filterPeople';
import { SinglePerson } from './SinglePerson';
import { ColumnHead } from './ColumnHead';

interface Props {
  initialPeople: Person[];
  searchParams: URLSearchParams;
}

export const PeopleTable: FC<Props> = ({
  initialPeople,
  searchParams,
}) => {
  const sortBy = searchParams.get('sort') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortOrder = searchParams.get('order') || '';

  const visiblePeople: Person[] = useMemo(() => {
    return filterPeople(
      initialPeople,
      sex,
      query,
      centuries,
      sortBy,
      sortOrder,
    );
  }, [sex, query, centuries, sortBy, sortOrder]);

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <ColumnHead
              nameOfColumn="Name"
              sortBy={sortBy}
              sortOrder={sortOrder}
              searchParams={searchParams}
            />

            <ColumnHead
              nameOfColumn="Sex"
              sortBy={sortBy}
              sortOrder={sortOrder}
              searchParams={searchParams}
            />

            <ColumnHead
              nameOfColumn="Born"
              sortBy={sortBy}
              sortOrder={sortOrder}
              searchParams={searchParams}
            />

            <ColumnHead
              nameOfColumn="Died"
              sortBy={sortBy}
              sortOrder={sortOrder}
              searchParams={searchParams}
            />

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map((person) => (
            <SinglePerson person={person} key={person.slug} />
          ))}

        </tbody>
      </table>

      {!visiblePeople.length && (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
