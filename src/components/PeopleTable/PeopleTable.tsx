import { Person } from '../../types';
import { PersonRow } from './PersonRow';
import { TableHeader } from './TableHeader';

export const PeopleTable:React.FC<{ list: Person[] }> = ({ list }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHeader />

      <tbody>
        {list.map((person:Person) => (
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
