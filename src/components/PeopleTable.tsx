import { Person } from '../types';

import { PeopleRowInfo } from './PeopleRowInfo';
import { TableHeader } from './TableHeader';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <TableHeader />

    <tbody>
      {people.map(person => (
        <PeopleRowInfo
          key={person.slug}
          person={person}
        />
      ))}
    </tbody>
  </table>
);
