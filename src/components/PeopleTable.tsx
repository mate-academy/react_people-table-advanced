import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PeopleTableProps {
  people: Person[];
  sortField: 'name' | 'sex' | 'born' | 'died';
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: 'name' | 'sex' | 'born' | 'died') => void;
}

export const PeopleTable = ({
  people,
  sortField,
  sortOrder,
  onSortChange,
}: PeopleTableProps) => {
  const renderSortIcon = (field: 'name' | 'sex' | 'born' | 'died') => {
    if (field !== sortField) {
      return <i className="fas fa-sort" />;
    }

    return sortOrder === 'asc' ? (
      <i className="fas fa-sort-up" />
    ) : (
      <i className="fas fa-sort-down" />
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => onSortChange('name')}
              className="button is-white"
            >
              Name<span className="icon">{renderSortIcon('name')}</span>
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => onSortChange('sex')}
              className="button is-white"
            >
              Sex<span className="icon">{renderSortIcon('sex')}</span>
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => onSortChange('born')}
              className="button is-white"
            >
              Born<span className="icon">{renderSortIcon('born')}</span>
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => onSortChange('died')}
              className="button is-white"
            >
              Died<span className="icon">{renderSortIcon('died')}</span>
            </button>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr data-cy="person" key={person.id}>
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died || '-'}</td>
            <td>
              {person.motherName ? (
                <Link
                  to={`/people/${person.motherSlug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <Link to={`/people/${person.fatherSlug}`}>
                  {person.fatherName}
                </Link>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
