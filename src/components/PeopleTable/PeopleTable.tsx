import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { TableHeader } from './TableHeader';

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
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
