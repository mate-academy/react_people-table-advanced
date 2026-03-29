/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {
  useLocation,
  Link,
  useSearchParams,
  useParams,
} from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper'; // 1. Використовуємо існуючу утиліту

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const renderSortIcon = (col: string) => {
    if (sort !== col) {
      return <i className="fas fa-sort" />;
    }

    return order === 'desc' ? (
      <i className="fas fa-sort-down" />
    ) : (
      <i className="fas fa-sort-up" />
    );
  };

  const getSortParams = (col: string) => {
    if (sort !== col) {
      return { sort: col, order: null };
    }

    if (order !== 'desc') {
      return { sort: col, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries({
            name: 'Name',
            sex: 'Sex',
            born: 'Born',
            died: 'Died',
          }).map(([key, label]) => (
            <th key={key}>
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortParams(key)),
                }}
                className="is-flex is-vcentered"
              >
                <span className="mr-1">{label}</span>
                <span className="icon is-small">{renderSortIcon(key)}</span>
              </Link>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
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

              <td>
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: location.search,
                    }}
                    className="has-text-danger"
                  >
                    {mother.name}
                  </Link>
                ) : person.motherName ? (
                  <span>{person.motherName}</span>
                ) : (
                  '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: location.search,
                    }}
                  >
                    {father.name}
                  </Link>
                ) : person.fatherName ? (
                  <span>{person.fatherName}</span>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
