import { Person } from '../../types';
import { PersonRow } from '../PersonRow';
import { useFilter } from '../../utils/useFilter';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const filteredPeople = useFilter(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
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
      {filteredPeople.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <tbody>
          {filteredPeople.map((person) => (
            <PersonRow person={person} people={filteredPeople} />
          ))}
        </tbody>
      )}
    </table>
  );
};
