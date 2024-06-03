import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink/PeopleLink';
import { SortColumns } from '../SortColumns/SortColumns';

type PeopleTableProps = {
  people: Person[];
};

const SORT_COLUMNS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const preparedPeople = people?.map(person => ({
    ...person,
    mother: people.find(personItem => personItem.name === person.motherName),
    father: people.find(personItem => personItem.name === person.fatherName),
  }));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_COLUMNS.map(column => (
            <SortColumns key={column} column={column} />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PeopleLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
