import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { getPreparedPeople } from '../helpers';
import { matchParents } from '../helpers';
import { PeopleFilters } from './PeopleFilter';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await getPeople();
        const withParents = matchParents(response as Person[]);

        setPeople(withParents);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const preparedPeople = getPreparedPeople(people, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people?.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!preparedPeople?.length && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!preparedPeople?.length && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
