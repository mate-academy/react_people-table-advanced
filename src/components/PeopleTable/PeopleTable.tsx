import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';
import { TableHeadItem } from '../TableHeadItem';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const tableHeadItems = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const parents = ['Mother', 'Father'];
  const canAddIcon = (value: string): boolean => {
    return !parents.includes(value);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeadItems.map(item => (
            <TableHeadItem key={item} item={item} canAddIcon={canAddIcon} />
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo person={person} people={people} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
