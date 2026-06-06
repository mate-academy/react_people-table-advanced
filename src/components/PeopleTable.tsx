import { Person } from '../types';
import { PersonOfTable } from './PersonOfTable';
import { useParams } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface PeopleTableProps {
  people: Person[];
  onSort: (field: string) => void;
  sortBy: string | null;
  order: string | null;
}

export const PeopleTable = ({
  people,
  onSort,
  sortBy,
  order,
}: PeopleTableProps) => {
  const { slug } = useParams();

  const selected = people.find(person => person.slug === slug);

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
              <a
                href="#/people?sort=name"
                onClick={event => {
                  event.preventDefault();
                  onSort('name');
                }}
              >
                <span className="icon">
                  {sortBy === 'name' && order === 'asc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {sortBy === 'name' && order === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                  {sortBy !== 'name' && <i className="fas fa-sort" />}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={event => {
                  event.preventDefault();
                  onSort('sex');
                }}
              >
                <span className="icon">
                  {sortBy === 'sex' && order === 'asc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {sortBy === 'sex' && order === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                  {sortBy !== 'sex' && <i className="fas fa-sort" />}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={event => {
                  event.preventDefault();
                  onSort('born');
                }}
              >
                <span className="icon">
                  {sortBy === 'born' && order === 'asc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {sortBy === 'born' && order === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                  {sortBy !== 'born' && <i className="fas fa-sort" />}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={event => {
                  event.preventDefault();
                  onSort('died');
                }}
              >
                <span className="icon">
                  {sortBy === 'died' && order === 'asc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {sortBy === 'died' && order === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                  {sortBy !== 'died' && <i className="fas fa-sort" />}
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <PersonOfTable
              person={person}
              key={person.slug}
              selected={selected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
