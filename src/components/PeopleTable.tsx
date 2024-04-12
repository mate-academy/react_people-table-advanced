// import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TableHeader } from './TableHeader';
// import { getPreparedPeople } from '../helpers/getPreparedPeople';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <TableHeader />
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};
