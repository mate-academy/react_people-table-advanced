/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
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
          setPeople(data);
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
    let sortedPeople = [...people];

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
  }, [people, sort, reversed, query]);

  const getSortIcon = (sorted: string) => {
    if (sort === sorted) {
      return reversed ? 'fas fa-sort-down' : 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  };

  const sortedPeople = useMemo(() => getSortedPeople(), [getSortedPeople]);

  const toggleCentury = (centuryProp: string) => {
    const newCenturies = century.includes(centuryProp)
      ? century.filter(c => c !== centuryProp)
      : [...century, centuryProp];

    return {
      centuries: newCenturies || null,
    };
  };

  const getFilteredPeople = (
    _sorted: Person[],
    sexSort: string,
    centurySort: string | string[],
  ) => {
    let filteredPeople = sortedPeople;

    if (sex && sex !== 'all') {
      filteredPeople = filteredPeople.filter(person => person.sex === sexSort);
    }

    if (century.length) {
      if (century.length) {
        filteredPeople = filteredPeople.filter(p => {
          const cent = Math.floor(p.born / 100 + 1).toString();

          return centurySort.includes(cent);
        });
      }
    }

    return filteredPeople;
  };

  const filteredPeople = getFilteredPeople(sortedPeople, sex || 'all', century);

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
              {!people.length && !loader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {filteredPeople.length === 0 && !loader && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loader &&
                !error &&
                people.length > 0 &&
                filteredPeople.length > 0 && (
                  <div className="box table-container">
                    <PeopleTable
                      filteredPeople={filteredPeople}
                      getSortIcon={getSortIcon}
                      people={people}
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
