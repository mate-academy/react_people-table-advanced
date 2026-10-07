import { PersonRow } from '../PersonRow';
import { PeopleTableSortHeader } from '../PeopleTableSortHeader';

import type { Person } from '../../types';

type Props = {
  people: Person[];
};

const SORT_HEADERS = [
  {
    name: 'name',
    text: 'Name',
  },
  {
    name: 'sex',
    text: 'Sex',
  },
  {
    name: 'born',
    text: 'Born',
  },
  {
    name: 'died',
    text: 'Died',
  },
];

export const PeopleTable = ({ people }: Props) => {
  const peopleByName = new Map(people.map(person => [person.name, person]));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_HEADERS.map(sortHeader => (
            <PeopleTableSortHeader
              key={sortHeader.name}
              sortHeader={sortHeader}
            />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? peopleByName.get(person.motherName) || null
            : null;

          const father = person.fatherName
            ? peopleByName.get(person.fatherName) || null
            : null;

          return (
            <PersonRow
              key={person.slug}
              person={person}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
