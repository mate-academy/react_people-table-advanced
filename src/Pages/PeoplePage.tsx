import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader/Loader';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';

export const PeoplePage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setUsers)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const usersWithParents = useMemo(() => users.map((user) => {
    const newUser = { ...user };

    newUser.mother = users.find((person) => person.name === user.motherName);
    newUser.father = users.find((person) => person.name === user.fatherName);

    return newUser;
  }), [users]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <>
            <div className="column is-7-tablet is-narrow-desktop">
              {!loading && !error && users.length > 0 && (
                <PeopleFilters />
              )}
            </div>

            <div className="column">
              <div className="box table-container">
                {loading && <Loader />}
                {!loading && error && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {!loading && !error && (
                  <PeopleTable peoples={usersWithParents} />
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
