import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const getCentury = (year: number) => Math.ceil(year / 100);

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(getCentury(person.born)));

    return matchesQuery && matchesCentury;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;

        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;

        case 'born':
          result = a.born - b.born;
          break;

        case 'died':
          result = a.died - b.died;
          break;

        default:
          break;
      }

      return order === 'desc' ? -result : result;
    });
  }

  const getSortSearch = (field: SortField) => {
    if (sort !== field) {
      return getSearchWith(searchParams, {
        sort: field,
        order: null,
      });
    }

    if (!order) {
      return getSearchWith(searchParams, {
        sort: field,
        order: 'desc',
      });
    }

    return getSearchWith(searchParams, {
      sort: null,
      order: null,
    });
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const getPersonLink = (person: Person) => {
    const search = searchParams.toString();

    return {
      pathname: `/people/${person.slug}`,
      search: search ? `?${search}` : '',
    };
  };

  const renderParent = (parentName: string | null, sex: string) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (!parent) {
      return parentName;
    }

    return (
      <Link
        to={getPersonLink(parent)}
        className={sex === 'f' ? 'has-text-danger' : ''}
      >
        {parent.name}
      </Link>
    );
  };

  const sortFields: SortField[] = ['name', 'sex', 'born', 'died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}

                <Link
                  to={{
                    search: getSortSearch(field),
                  }}
                  className="button is-white is-small"
                >
                  <span className="icon">
                    <i className={getSortIcon(field)} />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <Link
                to={getPersonLink(person)}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>{renderParent(person.motherName, 'f')}</td>

            <td>{renderParent(person.fatherName, 'm')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
