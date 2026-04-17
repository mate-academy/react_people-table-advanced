import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};
/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people, selectedSlug, onSelect }: Props) => {
  const getPersonByName = (name: string | null) =>
    people.find(p => p.name === name);

  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const getNextSortParams = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (sortOrder === null) {
      return { sort: field, order: 'desc' }; // другий клік: desc
    }

    return { sort: null, order: null }; // третій клік: прибираємо сортування
  };

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
              {/* Використовуємо Link замість <a> */}
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    getNextSortParams('name'),
                  ),
                }}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort${sortField === 'name' ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, getNextSortParams('sex')),
                }}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort${sortField === 'sex' ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    getNextSortParams('born'),
                  ),
                }}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort${sortField === 'born' ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    getNextSortParams('died'),
                  ),
                }}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort${sortField === 'died' ? (sortOrder === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(user => (
          <tr
            data-cy="person"
            key={user.slug}
            className={
              user.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={user} onSelect={onSelect} />
            </td>
            <td>{user.sex}</td>
            <td>{user.born}</td>
            <td>{user.died}</td>
            <td>
              {user.motherName ? (
                getPersonByName(user.motherName) ? (
                  <PersonLink person={getPersonByName(user.motherName)!} />
                ) : (
                  user.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {user.fatherName ? (
                getPersonByName(user.fatherName) ? (
                  <PersonLink person={getPersonByName(user.fatherName)!} />
                ) : (
                  user.fatherName
                )
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
