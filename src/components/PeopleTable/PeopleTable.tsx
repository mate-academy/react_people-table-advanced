import { Person } from '../../types';
import { PersonRow } from '../PersonRow';
import { useFilter } from '../../utils/useFilter';
import { Sort } from '../Sort';

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
          <th>
            Name
            <Sort type="name" />

          </th>
          <th>
            Sex
            <Sort type="sex" />
          </th>
          <th>
            Born
            <Sort type="born" />
          </th>
          <th>
            Died
            <Sort type="died" />
          </th>
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
