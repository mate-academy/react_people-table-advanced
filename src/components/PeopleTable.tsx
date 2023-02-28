import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleTableItem } from './PeopleTableItem';
import { TableLabel } from './TableLabel';

interface Props {
  people: Person[],
  currentSlug: string,
}

export const PeopleTable:React.FC<Props> = ({ people, currentSlug }) => {
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(title => (
            <th key={title}>
              <TableLabel
                searchParams={searchParams}
                columnName={title}
              />
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleTableItem
            person={person}
            currentSlug={currentSlug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
