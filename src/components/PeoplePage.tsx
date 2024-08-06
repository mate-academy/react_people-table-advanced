import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleFromApi, setPeopleFromApi] = useState<Person[]>([] as Person[]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeopleFromApi)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {peopleFromApi.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!error && !loading && peopleFromApi.length > 0 && (
                <PeopleTable
                  peopleFromApi={peopleFromApi}
                  selectedSlug={slug || ''}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
