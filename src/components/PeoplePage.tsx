import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';

export type User = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
};

export const PeoplePage = () => {
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(usersFromServer => {
        setUsers(usersFromServer);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="section">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && users !== undefined && users.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && users && users?.length > 0 && !error && (
                <PeopleTable users={users} />
              )}

              <p>There are no people matching the current search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
