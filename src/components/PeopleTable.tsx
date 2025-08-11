import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people: peopleData }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = useMemo(() => {
    return [...peopleData].filter(
      p =>
        p.sex.includes(sex) &&
        (p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
          p.motherName?.toLowerCase().includes(query.toLowerCase())) &&
        (centuries.length
          ? centuries.includes(Math.floor(p.born / 100 + 1).toString())
          : true),
    );
  }, [sex, centuries, peopleData, query]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople];

    sorted.sort((a, b) => {
      const valueA = a[sort as keyof Person] || '';
      const valueB = b[sort as keyof Person] || '';

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return sorted;
  }, [filteredPeople, sort, order]);

  const buildSortLink = (column: keyof Person) => {
    const currentSort = sort === column ? order : '';
    let newOrder = 'asc';

    if (currentSort === 'asc') {
      newOrder = 'desc';
    } else if (currentSort === 'desc') {
      newOrder = '';
    }

    const newParams = { ...Object.fromEntries(searchParams) };

    if (newOrder === '') {
      delete newParams.sort;
      delete newParams.order;
    } else {
      newParams.sort = column;
      newParams.order = newOrder;
    }

    const queryParams = new URLSearchParams(newParams).toString();

    return `/people${queryParams ? `?${queryParams}` : ''}`;
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
              <Link
                to={buildSortLink('name')}
                className="button is-small is-light"
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sort === 'name'
                        ? order === 'asc'
                          ? 'fa-sort-up'
                          : order === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={buildSortLink('sex')}
                className="button is-small is-light"
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sort === 'sex'
                        ? order === 'asc'
                          ? 'fa-sort-up'
                          : order === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={buildSortLink('born')}
                className="button is-small is-light"
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sort === 'born'
                        ? order === 'asc'
                          ? 'fa-sort-up'
                          : order === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={buildSortLink('died')}
                className="button is-small is-light"
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sort === 'died'
                        ? order === 'asc'
                          ? 'fa-sort-up'
                          : order === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort'
                        : 'fa-sort'
                    }`}
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
        {sortedPeople.map(person => (
          <PersonLink key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};
