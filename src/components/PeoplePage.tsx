/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const reversed = searchParams.get('reversed');
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const century = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(data => {
        if (data) {
          setPeoples(data);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const getSortedPeople = useCallback(() => {
    let sortedPeople = [...peoples];

    if (sortedPeople && sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          sortedPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
          break;
        case 'born':
        case 'died':
          sortedPeople.sort((a, b) => a[sort] - b[sort]);
          break;
      }
    }

    if (reversed) {
      sortedPeople.reverse();
    }

    if (query) {
      sortedPeople = sortedPeople.filter(person =>
        person.name.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    return sortedPeople;
  }, [peoples, sort, reversed, query]);

  const getSortIcon = (sorted: string) => {
    if (sort === sorted) {
      return reversed ? 'fas fa-sort-down' : 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  };

  let sortedPeople = useMemo(() => getSortedPeople(), [getSortedPeople]);

  if (sex && sex !== 'all') {
    sortedPeople = sortedPeople.filter(person => person.sex === sex);
  }

  const toggleCentury = (centuryProp: string) => {
    const newCenturies = century.includes(centuryProp)
      ? century.filter(c => c !== centuryProp)
      : [...century, centuryProp];

    return {
      centuries: newCenturies || null,
    };
  };

  if (century.length) {
    sortedPeople = sortedPeople.filter(p => {
      const cent = Math.floor(p.born / 100 + 1).toString();

      return century.includes(cent);
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && !error && (
              <PeopleFilters toggleCentury={toggleCentury} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!peoples.length && !loader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {sortedPeople.length === 0 && !loader && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loader &&
                !error &&
                peoples.length > 0 &&
                sortedPeople.length > 0 && (
                  <div className="box table-container">
                    <PeopleTable
                      sortedPeople={sortedPeople}
                      getSortIcon={getSortIcon}
                      peoples={peoples}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
