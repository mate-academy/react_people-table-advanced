import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import * as peopleService from '../api';
import { Loader } from '../components/Loader';
import { Layout } from '../components/Layout';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPeople = () => {
    setLoading(true);
    setError(false);

    peopleService
      .getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(fetchPeople, []);

  return (
    <Layout title="People Page">
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading
            && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
