import classNames from 'classnames';
import { SortableColumnName } from '../SortableColumnName';
import { PersonRow } from '../PersonRow';
import { SortBy, SortOrder } from '../../types';
import { columnNames } from './columnNames';
import './styles.css';

type Props = {
  selectedSortBy: SortBy | null,
  selectedSortOrder: SortOrder,
  filteredPeople: ProcessedPerson[],
  handleSortByChange: (sortBy: SortBy) => void,
};

export const PeopleTable: React.FC<Props> = ({
  selectedSortBy,
  selectedSortOrder,
  filteredPeople,
  handleSortByChange,
}) => {
  return (
    <table className="table is-striped is-hoverable">
      <thead>
        <tr>
          {
            columnNames.map(({ title, sortBy }) => {
              return (
                <th
                  key={title}
                  className={classNames({
                    'selected-th': sortBy && selectedSortBy === sortBy,
                  })}
                >
                  {sortBy
                    ? (
                      <SortableColumnName
                        title={title}
                        sortBy={sortBy}
                        selectedSortBy={selectedSortBy}
                        selectedSortOrder={selectedSortOrder}
                        handleSortByChange={handleSortByChange}
                      />
                    )
                    : title}
                </th>
              );
            })
          }
        </tr>
      </thead>
      <tbody>
        {filteredPeople.map(person => (
          <PersonRow key={person.name} {...person} />
        ))}
      </tbody>
    </table>
  );
};
