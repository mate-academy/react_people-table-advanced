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
  const [searchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');

  const filteredPeople = useMemo(() => {
    const peopleWithParents = users.map(user => ({
      ...user,
      mother: users.find(u => u.name === user.motherName),
      father: users.find(u => u.name === user.fatherName),
    }));

    if (sexFilter) {
      return peopleWithParents.filter(person => person.sex === sexFilter);
    }

    return peopleWithParents;
  }, [users, sexFilter]);

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
                <a href="#/people?sort=name">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <a href="#/people?sort=sex">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <a href="#/people?sort=born&amp;order=desc">
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </a>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <a href="#/people?sort=died">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople.map(person => (
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
