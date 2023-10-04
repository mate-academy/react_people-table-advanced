import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { COLUMN_NAMES } from '../utils/constants';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { personId = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_NAMES.map(name => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonItem
            person={person}
            key={person.slug}
            selectedPerson={personId}
          />
        ))}
      </tbody>
    </table>
  );
};
