import { Person } from '../types';
import { PersonData } from './PersonData';

interface TableProps {
  people: Person[];
  selectedSlug?: string;
  sortBy?: string | null;
  sortOrder?: string | null;
  handleSortChange: (value: string) => void;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({
  people,
  selectedSlug,
  sortBy,
  sortOrder,
  handleSortChange,
}: TableProps) => {
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
              <span className="icon" onClick={() => handleSortChange('name')}>
                {sortBy !== 'name' && <i className="fas fa-sort"></i>}
                {sortBy === 'name' && sortOrder === 'asc' && (
                  <i className="fas fa-sort-up"></i>
                )}
                {sortBy === 'name' && sortOrder === 'desc' && (
                  <i className="fas fa-sort-down"></i>
                )}
              </span>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span className="icon" onClick={() => handleSortChange('sex')}>
                {sortBy !== 'sex' && <i className="fas fa-sort"></i>}
                {sortBy === 'sex' && sortOrder === 'asc' && (
                  <i className="fas fa-sort-up"></i>
                )}
                {sortBy === 'sex' && sortOrder === 'desc' && (
                  <i className="fas fa-sort-down"></i>
                )}
              </span>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span className="icon" onClick={() => handleSortChange('born')}>
                {sortBy !== 'born' && <i className="fas fa-sort"></i>}
                {sortBy === 'born' && sortOrder === 'asc' && (
                  <i className="fas fa-sort-up"></i>
                )}
                {sortBy === 'born' && sortOrder === 'desc' && (
                  <i className="fas fa-sort-down"></i>
                )}
              </span>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span className="icon" onClick={() => handleSortChange('died')}>
                {sortBy !== 'died' && <i className="fas fa-sort"></i>}
                {sortBy === 'died' && sortOrder === 'asc' && (
                  <i className="fas fa-sort-up"></i>
                )}
                {sortBy === 'died' && sortOrder === 'desc' && (
                  <i className="fas fa-sort-down"></i>
                )}
              </span>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Mother
              <span
                className="icon"
                onClick={() => handleSortChange('motherName')}
              >
                {sortBy !== 'motherName' && <i className="fas fa-sort"></i>}
                {sortBy === 'motherName' && sortOrder === 'asc' && (
                  <i className="fas fa-sort-up"></i>
                )}
                {sortBy === 'motherName' && sortOrder === 'desc' && (
                  <i className="fas fa-sort-down"></i>
                )}
              </span>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Father
              <span
                className="icon"
                onClick={() => handleSortChange('fatherName')}
              >
                {sortBy !== 'fatherName' && <i className="fas fa-sort"></i>}
                {sortBy === 'fatherName' && sortOrder === 'asc' && (
                  <i className="fas fa-sort-up"></i>
                )}
                {sortBy === 'fatherName' && sortOrder === 'desc' && (
                  <i className="fas fa-sort-down"></i>
                )}
              </span>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <PersonData people={people} name={person.name} />

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <PersonData people={people} name={person.motherName} />
            <PersonData people={people} name={person.fatherName} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
