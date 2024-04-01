import { Person } from '../../types';
import { SortType } from '../../types/SortType';
import { PersonInfo } from '../PersonInfo';
import { TableHeadItem } from '../TableHeadItem';

interface Props {
  filteredPeople: Person[];
  people: Person[];
  sortType: string;
  sortDirection: string;
}

export const PeopleTable: React.FC<Props> = ({
  filteredPeople,
  people,
  sortType,
  sortDirection,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortType).map(([key, value]) => (
            <TableHeadItem
              key={key}
              itemKey={key}
              itemValue={value}
              sortType={sortType}
              sortDirection={sortDirection}
            />
          ))}
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonInfo person={person} people={people} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
