import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleMaleFemale } from './PeopleMaleFemale';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const field = searchParams.get('sort') || '';
    const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    setSortField(field);
    setSortOrder(order);
  }, [location.search]);

  const handleSortClick = (field: string, e: React.MouseEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);

    if (sortField !== field) {
      searchParams.set('sort', field);
      searchParams.delete('order');
    } else {
      if (sortOrder === 'asc') {
        searchParams.set('order', 'desc');
      } else {
        searchParams.delete('sort');
        searchParams.delete('order');
      }
    }

    navigate(
      {
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const valueA = a[sortField as keyof Person];
    const valueB = b[sortField as keyof Person];

    if (valueA === undefined || valueB === undefined) {
      return 0;
    }

    let comparison = 0;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      comparison = valueA.localeCompare(valueB);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      comparison = valueA - valueB;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return 'fa-sort';
    }

    return sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  };

  const getPreservedLink = (to: string) => {
    const searchParams = new URLSearchParams(location.search);

    return `${to}?${searchParams.toString()}`;
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
                to={getPreservedLink('/people')}
                onClick={e => handleSortClick('name', e)}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={getPreservedLink('/people')}
                onClick={e => handleSortClick('sex', e)}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={getPreservedLink('/people')}
                onClick={e => handleSortClick('born', e)}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={getPreservedLink('/people')}
                onClick={e => handleSortClick('died', e)}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
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
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link
                to={getPreservedLink(`/people/${person.slug}`)}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link to={getPreservedLink(`/people/${person.mother.slug}`)}>
                  <PeopleMaleFemale person={person.mother} />
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link to={getPreservedLink(`/people/${person.father.slug}`)}>
                  <PeopleMaleFemale person={person.father} />
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
