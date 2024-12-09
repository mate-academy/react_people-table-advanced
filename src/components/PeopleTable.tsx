import { FC } from 'react';
import { Person, PersonFields } from '../types';
import PersonLink from './PersonLink';

type Props = {
  people: Person[];
};

const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(PersonFields).map(field => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
