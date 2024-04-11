import { FC } from 'react';
import { Person } from '../../types';
import { PeopleList } from './';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople, useSortParams, sortPeopleBy } from '../../utils';
import { SortColumn } from '../sort';

interface Props {
  people: Person[];
}

const SORT_COLUMNS = ['name', 'sex', 'born', 'died'];

export const PeopleTable: FC<Props> = ({ people }) => {
  const { sortParam, orderParam } = useSortParams();
  const [searchParams] = useSearchParams();

  const visiblePeople = getFilteredPeople(
    people,
    searchParams.get('query'),
    searchParams.get('sex'),
    searchParams.getAll('centuries'),
  );

  const sortedPeople = sortPeopleBy(visiblePeople, sortParam, orderParam);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_COLUMNS.map(item => (
            <SortColumn key={item} column={item} />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <PeopleList people={sortedPeople} />
    </table>
  );
};
