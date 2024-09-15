import { useSearchParams } from 'react-router-dom';
import { useSortParams } from '../../hooks/useSortParams';
import { Person } from '../../types';
import { TableHeader } from '../../types/TableHeader';
import { getVisiblePeople } from '../../utils/getVisiblePeople';
import PersonInfo from '../PersonInfo/PersonInfo';
import TableHeaderTitle from './TableHeaderTitle/TableHeaderTitle';

const PeopleTable = ({ people }: { people: Person[] }) => {
  const [searchParams] = useSearchParams();
  const { sortParam, orderParam } = useSortParams();

  const visiblePeople = getVisiblePeople(
    people,
    searchParams.get('sex'),
    searchParams.get('query'),
    searchParams.getAll('centuries'),
    sortParam,
    orderParam,
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(TableHeader).map(tableHeader => (
            <TableHeaderTitle key={tableHeader} title={tableHeader} />
          ))}
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonInfo key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
