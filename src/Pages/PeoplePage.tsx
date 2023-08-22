import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader/Loader';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { getPreparedUsers } from '../utils/getPreparedUsers';

export const PeoplePage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  const [searchParameters] = useSearchParams();

  const sex = searchParameters.get('sex') || '';
  const query = searchParameters.get('query') || '';
  const centuries = searchParameters.getAll('centuries') || [];
  const sort = searchParameters.get('sort') || '';
  const order = searchParameters.get('order') || '';

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

  const preparedUsers = useMemo(() => getPreparedUsers({
    sexPar: sex,
    queryPar: query,
    centuriesPar: centuries,
    sortPar: sort,
    orderPar: order,
    peoples: usersWithParents,
  }), [searchParameters, users]);

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
                {preparedUsers.length < 1 && !loading && !error && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
                {usersWithParents.length < 1 && !loading && !error && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!loading && !error && preparedUsers.length > 0 && (
                  <PeopleTable peoples={preparedUsers} />
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
