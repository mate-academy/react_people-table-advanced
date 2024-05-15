// import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import React, { useEffect, useState } from 'react';
import { sortFunction } from '../utils/sorter';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [renderedPeople, setRenderedPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setShowLoader(true);

    getPeople()
      .then(peops => {
        setPeople(peops);
        setRenderedPeople(peops);
      })
      .catch(() => setFetchError(true))
      .finally(() => setShowLoader(false));
  }, []);

  const filterByQuery = (pers: Person, currentQuerry: string) => {
    if (
      pers.name.toLowerCase().includes(currentQuerry.toLowerCase().trim()) ||
      (pers.motherName &&
        pers.motherName
          .toLowerCase()
          .includes(currentQuerry.toLowerCase().trim())) ||
      (pers.fatherName &&
        pers.fatherName
          .toLowerCase()
          .includes(currentQuerry.toLowerCase().trim()))
    ) {
      return true;
    }

    return;
  };

  useEffect(() => {
    const currentSex = searchParams.get('sex');
    const currentQuerry = searchParams.get('query') || '';
    const chosenCenturies = searchParams.getAll('centuries');

    if (currentSex && chosenCenturies.length > 0) {
      setRenderedPeople(
        sortFunction(
          people.filter(
            pers =>
              pers.sex === currentSex &&
              filterByQuery(pers, currentQuerry) &&
              chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
          ),
          searchParams,
        ),
      );
    } else if (currentSex && chosenCenturies.length === 0) {
      setRenderedPeople(
        sortFunction(
          people.filter(
            pers =>
              pers.sex === currentSex && filterByQuery(pers, currentQuerry),
          ),
          searchParams,
        ),
      );
    } else if (!currentSex && chosenCenturies.length > 0) {
      setRenderedPeople(
        sortFunction(
          people.filter(
            pers =>
              filterByQuery(pers, currentQuerry) &&
              chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
          ),
          searchParams,
        ),
      );
    } else {
      setRenderedPeople(
        sortFunction(
          people.filter(pers => filterByQuery(pers, currentQuerry)),
          searchParams,
        ),
      );
    }
  }, [searchParams, people, setRenderedPeople]);

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
