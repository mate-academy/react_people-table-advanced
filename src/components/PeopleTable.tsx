import { Person } from '../types';
import { SortTypes } from '../types/SortTypes';
import { SortParam } from './SortParam';
import { PersonLink } from './PersonLink';

type Props = {
  filteredPeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({ filteredPeople }) => {
  const sortKeys
    = [SortTypes.NAME, SortTypes.SEX, SortTypes.BORN, SortTypes.DIED];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortKeys.map(key => (
            <SortParam param={key} key={key} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
