import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { selected } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const titleFilter = searchParams.get('title');
  const centuries = searchParams.getAll('century');
  const sort = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const handleSortFilter = (name: string) => () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      if (name) {
        newParams.set('sort', name);
      }

      if (sort === name) {
        newParams.set('order', 'desc');
      } else {
        newParams.delete('order');
      }

      if (sortOrder && sort === name) {
        newParams.delete('order');
        newParams.delete('sort');
      }

      return newParams;
    });
  };

  const filteredPeople = useMemo(() => {
    const peopleWithParents = users.map(user => ({
      ...user,
      mother: users.find(u => u.name === user.motherName),
      father: users.find(u => u.name === user.fatherName),
    }));

    let filtered = peopleWithParents;

    if (sexFilter) {
      filtered = filtered.filter(person => person.sex === sexFilter);
    }

    if (titleFilter) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(titleFilter) ||
          person.motherName?.toLowerCase().includes(titleFilter) ||
          person.fatherName?.toLowerCase().includes(titleFilter),
      );
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    return filtered;
  }, [users, sexFilter, titleFilter, centuries]);

  const sortedPeople = useMemo(() => {
    const sorted = [...filteredPeople];

    if (sort) {
      sorted.sort((a, b) => {
        const order = sortOrder === 'desc' ? -1 : 1;

        switch (sort) {
          case 'name':
            return order * a.name.localeCompare(b.name);
          case 'sex':
            return order * a.sex.localeCompare(b.sex);
          case 'born':
            return order * (a.born - b.born);
          case 'died':
            return order * ((a.died || 0) - (b.died || 0));
          default:
            return 0;
        }
      });
    }

    return sorted;
  }, [filteredPeople, sort, sortOrder]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const data = await getPeople();

        setUsers(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        setError('Error');
      }
    };

    fetchPersons();
  }, [setLoading]);

  const getSortIconClass = (field: string) => {
    if (sort !== field) {
      return '';
    }

    if (!sortOrder) {
      return '-up';
    }

    return sortOrder === 'desc' ? '-down' : '-up';
  };

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (users.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (filteredPeople.length === 0) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <div className="box table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <a onClick={handleSortFilter('name')}>
                  <span className="icon">
                    <i className={`fas fa-sort${getSortIconClass('name')}`} />
                  </span>
                </a>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <a onClick={handleSortFilter('sex')}>
                  <span className="icon">
                    <i className={`fas fa-sort${getSortIconClass('sex')}`} />
                  </span>
                </a>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <a onClick={handleSortFilter('born')}>
                  <span className="icon">
                    <i className={`fas fa-sort${getSortIconClass('born')}`} />
                  </span>
                </a>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <a onClick={handleSortFilter('died')}>
                  <span className="icon">
                    <i className={`fas fa-sort${getSortIconClass('died')}`} />
                  </span>
                </a>
              </span>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {sortedPeople.map(person => (
            <tr
              className={classNames({
                'has-background-warning': selected === person.slug,
              })}
              data-cy="person"
              key={person.name}
            >
              <td>
                <Link
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  to={`/people/${person.slug}`}
                >
                  {person.name.trim()}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person && person.mother ? (
                  <PersonLink person={person?.mother} />
                ) : (
                  person.motherName ?? '-'
                )}
              </td>
              <td>
                {person && person.father ? (
                  <PersonLink person={person?.father} />
                ) : (
                  person.fatherName ?? '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
