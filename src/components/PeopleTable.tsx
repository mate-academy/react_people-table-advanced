import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {people.length > 0 && (
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
      )}
      <tbody>
        {people.map(person => (
          <PersonInfo person={person} key={person.slug} people={people} />
        ))}
      </tbody>
    </table>
  );
};
