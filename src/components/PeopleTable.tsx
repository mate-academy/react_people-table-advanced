import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
  centuries: string[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  centuries,
}) => {
  const { slugPerson } = useParams();
  const { search } = useLocation();

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';
  const filter = searchParams.get('filter') || '';
  const query = searchParams.get('query') || '';

  const getSortLink = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sortBy === field) {
      if (order === 'asc') {
        newParams.set('order', 'desc');
      } else {
        newParams.delete('sort');
        newParams.delete('order');
      }
    } else {
      newParams.set('sort', field);
      newParams.delete('order');
    }

    return `?${newParams.toString()}`;
  };

  const filteredPeople = [...people].filter(person => {
    const q = query.toLowerCase();

    const nameMatch =
      person.name.toLowerCase().includes(q) ||
      (person.motherName?.toLowerCase().includes(q) ?? false) ||
      (person.fatherName?.toLowerCase().includes(q) ?? false);

    if (filter === 'sexM' && person.sex !== 'm') {
      return false;
    }

    if (filter === 'sexF' && person.sex !== 'f') {
      return false;
    }

    const century = Math.ceil(person.born / 100);

    const centuryMatch =
      centuries.length === 0 || centuries.includes(String(century));

    return nameMatch && centuryMatch;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortBy) {
      return 0;
    }

    if (sortBy === 'name') {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return a.name.localeCompare(b.name) * -1;
      }
    }

    if (sortBy === 'sex') {
      if (order === 'asc') {
        return a.sex.localeCompare(b.sex);
      } else {
        return b.sex.localeCompare(a.sex);
      }
    }

    if (sortBy === 'born' || sortBy === 'died') {
      if (order === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    }

    return 0;
  });

  const findPerson = (personName: string | null) => {
    const foundPerson = people.find(person => person.name === personName);

    return foundPerson ? (
      <PersonLink person={foundPerson} search={search} />
    ) : (
      personName || '-'
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
              <Link to={getSortLink('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'name',
                      'fa-sort-up': sortBy === 'name' && order === 'asc',
                      'fa-sort-down': sortBy === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'sex',
                      'fa-sort-up': sortBy === 'sex' && order === 'asc',
                      'fa-sort-down': sortBy === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'born',
                      'fa-sort-up': sortBy === 'born' && order === 'asc',
                      'fa-sort-down': sortBy === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'died',
                      'fa-sort-up': sortBy === 'died' && order === 'asc',
                      'fa-sort-down': sortBy === 'died' && order === 'desc',
                    })}
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
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': slugPerson === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} search={search} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findPerson(person.motherName)}</td>
            <td>{findPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
