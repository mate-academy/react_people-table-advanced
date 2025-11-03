import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { PeopleSort } from './PeopleSort';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <PeopleSort value={'name'} />
          </th>

          <th>
            <PeopleSort value={'sex'} />
          </th>

          <th>
            <PeopleSort value={'born'} />
          </th>

          <th>
            <PeopleSort value={'died'} />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow person={person} key={person.slug} people={people} />
        ))}
      </tbody>
    </table>
  );
};
