import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

const getHeaderIconClass = (
  currentSort: string | null,
  currentOrder: string | null,
  field: string,
) => {
  if (currentSort !== field) {
    return 'fas fa-sort';
  }

  return currentOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
};

const getToggleSortParams = (
  currentSort: string | null,
  currentOrder: string | null,
  field: string,
) => {
  if (currentSort !== field) {
    return { sort: field, order: null };
  }

  if (currentOrder !== 'desc') {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
};

export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const peopleByName = useMemo(
    () => new Map(people.map(person => [person.name, person])),
    [people],
  );

  const buildColumnLink = (field: string) => {
    const toggleParams = getToggleSortParams(currentSort, currentOrder, field);
    const search = getSearchWith(searchParams, toggleParams);

    return {
      pathname: location.pathname,
      search: search ? `?${search}` : '',
    };
  };

  const buildPersonLink = (slugValue: string) => ({
    pathname: `/people/${slugValue}`,
    search: location.search,
  });

  const buildParentCell = (name: string | null | undefined) => {
    if (!name) {
      return '-';
    }

    const parent = peopleByName.get(name);

    if (!parent) {
      return name;
    }

    return (
      <Link
        to={buildPersonLink(parent.slug)}
        className={parent.sex === 'f' ? 'has-text-danger' : undefined}
      >
        {name}
      </Link>
    );
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
              <Link to={buildColumnLink('name')}>
                <span className="icon">
                  <i
                    className={getHeaderIconClass(
                      currentSort,
                      currentOrder,
                      'name',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={buildColumnLink('sex')}>
                <span className="icon">
                  <i
                    className={getHeaderIconClass(
                      currentSort,
                      currentOrder,
                      'sex',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={buildColumnLink('born')}>
                <span className="icon">
                  <i
                    className={getHeaderIconClass(
                      currentSort,
                      currentOrder,
                      'born',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={buildColumnLink('died')}>
                <span className="icon">
                  <i
                    className={getHeaderIconClass(
                      currentSort,
                      currentOrder,
                      'died',
                    )}
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug
                ? 'has-background-warning'
                : undefined
            }
          >
            <td>
              <Link
                to={buildPersonLink(person.slug)}
                className={person.sex === 'f' ? 'has-text-danger' : undefined}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{buildParentCell(person.motherName)}</td>
            <td>{buildParentCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
