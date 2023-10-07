import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeopleTable = ({
  people,
  handleSort,
  sortState,
}: {
  people: Person[],
  handleSort: (field: string) => void,
  sortState: { sortField: string | null, sortOrder: string | null }
}) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <span className="icon">
                {/* eslint-disable-next-line no-nested-ternary */}
                <i className={`fas fa-sort${sortState.sortField === 'name' ? (sortState.sortOrder === 'asc' ? '-up' : '-down') : ''}`} style={{ cursor: 'pointer' }} />
              </span>
            </span>
          </th>

          <th onClick={() => handleSort('sex')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span className="icon">
                {/* eslint-disable-next-line no-nested-ternary */}
                <i className={`fas fa-sort${sortState.sortField === 'sex' ? (sortState.sortOrder === 'asc' ? '-up' : '-down') : ''}`} style={{ cursor: 'pointer' }} />
              </span>
            </span>
          </th>

          <th onClick={() => handleSort('born')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span className="icon">
                {/* eslint-disable-next-line no-nested-ternary */}
                <i className={`fas fa-sort${sortState.sortField === 'born' ? (sortState.sortOrder === 'asc' ? '-up' : '-down') : ''}`} style={{ cursor: 'pointer' }} />
              </span>
            </span>
          </th>

          <th onClick={() => handleSort('died')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span className="icon">
                {/* eslint-disable-next-line no-nested-ternary */}
                <i className={`fas fa-sort${sortState.sortField === 'died' ? (sortState.sortOrder === 'asc' ? '-up' : '-down') : ''}`} style={{ cursor: 'pointer' }} />
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person: Person) => (
          <tr
            data-cy="person"
            key={person.slug}
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink person={person.motherName || ''} people={people} />
            </td>
            <td>
              <PersonLink person={person.fatherName || ''} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
