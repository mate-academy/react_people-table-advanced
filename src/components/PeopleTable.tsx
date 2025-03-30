import { SearchLink } from './SearchLink';
import { Person } from '../types/Person';

interface PersonLinkProps {
  name: string | null;
  people: Person[];
}

const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  if (!name) {
    return <span>-</span>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <SearchLink
      to={{ pathname: `/people/${person.slug}` }}
      params={{}}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </SearchLink>
  );
};

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
  onSort: (field: keyof Person) => void;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
  onSort,
  sortField,
  sortOrder,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <span
                className="icon"
                onClick={() => onSort('name')}
                style={{ cursor: 'pointer' }}
              >
                <i
                  className={`fas fa-sort${
                    sortField === 'name'
                      ? sortOrder === 'asc'
                        ? '-up'
                        : '-down'
                      : ''
                  }`}
                />
              </span>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span
                className="icon"
                onClick={() => onSort('sex')}
                style={{ cursor: 'pointer' }}
              >
                <i
                  className={`fas fa-sort${
                    sortField === 'sex'
                      ? sortOrder === 'asc'
                        ? '-up'
                        : '-down'
                      : ''
                  }`}
                />
              </span>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span
                className="icon"
                onClick={() => onSort('born')}
                style={{ cursor: 'pointer' }}
              >
                <i
                  className={`fas fa-sort${
                    sortField === 'born'
                      ? sortOrder === 'asc'
                        ? '-up'
                        : '-down'
                      : ''
                  }`}
                />
              </span>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span
                className="icon"
                onClick={() => onSort('died')}
                style={{ cursor: 'pointer' }}
              >
                <i
                  className={`fas fa-sort${
                    sortField === 'died'
                      ? sortOrder === 'asc'
                        ? '-up'
                        : '-down'
                      : ''
                  }`}
                />
              </span>
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
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
