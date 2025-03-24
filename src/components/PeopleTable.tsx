import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

interface PeopleTableProps {
  people: Person[];
  onSortChange: (field: string) => void;
  sortField: string | null;
  sortOrder: 'asc' | 'desc' | null;
  handleRowClick: (person: Person) => void;
  selectedPerson: Person | null;
}

export const PeopleTable = ({
  people,
  onSortChange,
  sortField,
  sortOrder,
  handleRowClick,
}: PeopleTableProps) => {
  const { slug } = useParams();

  const getSortIcon = (field: string) => {
    if (field !== sortField) {
      return <i className="fas fa-sort" />;
    }

    return sortOrder === 'asc' ? (
      <i className="fas fa-sort-up" />
    ) : (
      <i className="fas fa-sort-down" />
    );
  };

  return people.length === 0 ? (
    <p data-cy="noPeopleMessage" className="has-text-centered">
      No people found
    </p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => onSortChange('name')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              {getSortIcon('name')}
            </span>
          </th>
          <th onClick={() => onSortChange('sex')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {getSortIcon('sex')}
            </span>
          </th>
          <th onClick={() => onSortChange('born')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {getSortIcon('born')}
            </span>
          </th>
          <th onClick={() => onSortChange('died')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {getSortIcon('died')}
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={person.slug === slug ? 'has-background-warning' : ''}
            onClick={() => handleRowClick(person)}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={`has-text-weight-bold ${
                  person.sex === 'm'
                    ? 'has-text-link'
                    : person.sex === 'f'
                      ? 'has-text-danger'
                      : 'has-text-black'
                }`}
              >
                {person.name}
              </Link>
            </td>
            <td>
              {person.sex === 'm'
                ? 'Male'
                : person.sex === 'f'
                  ? 'Female'
                  : 'Other'}
            </td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <span
                  className={`${
                    person.mother.sex === 'm'
                      ? 'has-text-link'
                      : person.mother.sex === 'f'
                        ? 'has-text-danger'
                        : 'has-text-black'
                  }`}
                >
                  {person.mother.name}
                </span>
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.father ? (
                <span
                  className={`${
                    person.father.sex === 'm'
                      ? 'has-text-link'
                      : person.father.sex === 'f'
                        ? 'has-text-danger'
                        : 'has-text-black'
                  }`}
                >
                  {person.father.name}
                </span>
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
