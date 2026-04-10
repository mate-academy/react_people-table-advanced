/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import React from 'react';
import { Person } from '../types';

import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/filterPeolpe';
import { getSortedPeople } from '../utils/sortPeople';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[] | null>(null);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const centuriesKey = searchParams.getAll('centuries').join(',');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setAllPeople(data);
        setPeopleData(data);
      })
      .catch(err => {
        setError(err.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const centuries = centuriesKey.length > 0 ? centuriesKey.split(',') : [];

    const filteredPeople = getFilteredPeople(allPeople, sex, query, centuries);
    const sortedPeople = getSortedPeople(filteredPeople, sort, order);

    setPeopleData(sortedPeople);
  }, [allPeople, sex, query, centuriesKey, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && peopleData !== null && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          {loading && (
            <div className="column">
              <div className="box table-container">
                <Loader />
              </div>
            </div>
          )}

          {!loading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && peopleData && allPeople.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading &&
            peopleData &&
            allPeople.length > 0 &&
            peopleData.length === 0 && (
              <p>There are no people matching the current search criteria</p>
            )}

          {!loading && peopleData && peopleData.length > 0 && (
            <PeopleTable people={peopleData} />
          )}
        </div>
      </div>
    </>
  );
};
