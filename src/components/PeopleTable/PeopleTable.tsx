import { PersonType } from '../../types';
import { Person } from '../Person/Person';
import { TableHeader } from './TableHeader/TableHeader';

const COLUMNS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

type Props = {
  visiblePeople: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(column => (
            <TableHeader key={column} column={column} />
          ))}
        </tr>
      </thead>
      <tbody>
        {visiblePeople.map(person => (
          <Person key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
