import { TableHead } from './TableHead';
import { PersonRow } from './PersonRow';
import { Person } from '../types';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />
      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
