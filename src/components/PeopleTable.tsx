import { Person } from '../types';
import { PersonLink } from './PersonLink';

type SortField = 'name' | 'sex' | 'born' | 'died';
type SortOrder = 'asc' | 'desc';
interface PeopleTableProps {
  people: Person[];
  selectedName: string | null;
  currentSort: SortField | null;
  currentOrder: SortOrder | null;
  onSortChange: (field: SortField) => void;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedName,
  currentSort,
  currentOrder,
  onSortChange,
}) => {
  const findPersonByName = (name: string | null | undefined) => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name) || null;
  };

  const renderSortIcon = (field: SortField) => {
    if (currentSort !== field) {
      return null;
    }

    if (currentOrder === 'asc') {
      return <i className="fas fa-arrow-up" />;
    }

    if (currentOrder === 'desc') {
      return <i className="fas fa-arrow-down" />;
    }

    return null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <a
              className="is-flex is-flex-wrap-nowrap is-align-items-center"
              onClick={() => onSortChange('name')}
            >
              Name
              <span className="icon">
                {renderSortIcon('name') || <i className="fas fa-sort" />}
              </span>
            </a>
          </th>

          <th>
            <a
              className="is-flex is-flex-wrap-nowrap is-align-items-center"
              onClick={() => onSortChange('sex')}
            >
              Sex
              <span className="icon">
                {renderSortIcon('sex') || <i className="fas fa-sort" />}
              </span>
            </a>
          </th>

          <th>
            <a
              className="is-flex is-flex-wrap-nowrap is-align-items-center"
              onClick={() => onSortChange('born')}
            >
              Born
              <span className="icon">
                {renderSortIcon('born') || <i className="fas fa-sort" />}
              </span>
            </a>
          </th>

          <th>
            <a
              className="is-flex is-flex-wrap-nowrap is-align-items-center"
              onClick={() => onSortChange('died')}
            >
              Died
              <span className="icon">
                {renderSortIcon('died') || <i className="fas fa-sort" />}
              </span>
            </a>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.name === selectedName;

          const motherDetails = findPersonByName(person.motherName);
          const fatherDetails = findPersonByName(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName ? (
                  '-'
                ) : motherDetails ? (
                  <PersonLink person={motherDetails} />
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : fatherDetails ? (
                  <PersonLink person={fatherDetails} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
