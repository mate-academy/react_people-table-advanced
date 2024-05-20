import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRenderedPeople } from '../utils/getRenderedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setShowLoader(true);

    getPeople()
      .then(peops => {
        setPeople(peops);
      })
      .catch(() => setFetchError(true))
      .finally(() => setShowLoader(false));
  }, []);

  const currentSex = searchParams.get('sex');
  const currentQuerry = searchParams.get('query') || '';
  const chosenCenturies = searchParams.getAll('centuries');

  const renderedPeople = getRenderedPeople(
    currentSex,
    currentQuerry,
    chosenCenturies,
    people,
    searchParams,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {showLoader && <Loader />}

              {fetchError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !showLoader && !fetchError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {renderedPeople.length === 0 && !showLoader && !fetchError && (
                <p>There are no people matching the current search criteria</p>
              )}

              {renderedPeople.length > 0 && (
                <PeopleTable visiblePeople={renderedPeople} people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
