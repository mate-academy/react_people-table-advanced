/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const location = useLocation();

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const columnLabels: Record<string, string> = {
    name: 'Name',
    sex: 'Sex',
    born: 'Born',
    died: 'Died',
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {columnLabels[field]}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={getSortIcon(field)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr key={person.slug} data-cy="person">
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: location.search,
                }}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName || '-'}</td>
            <td>{person.fatherName || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
