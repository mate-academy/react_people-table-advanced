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
          sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'sex':
          sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
          break;
        case 'born':
          sortedPeople.sort((a, b) => a.born - b.born);
          break;
        case 'died':
          sortedPeople.sort((a, b) => a.died - b.died);
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

  // console.log(sex, 'dfdf');
  if (sex) {
    switch (sex) {
      case 'f':
        sortedPeople = sortedPeople.filter(person => person.sex === 'f');
        break;
      case 'm':
        sortedPeople = sortedPeople.filter(person => person.sex === 'm');
        break;
      default:
        break;
    }
  }

  function toggleCentury(centuryProp: string) {
    const newCenturies = century.includes(centuryProp)
      ? century.filter(c => c !== centuryProp)
      : [...century, centuryProp];

    return sortedPeople.filter(person =>
      person.century.some((c: string) => newCenturies.includes(c)),
    );
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

              {/* <p>There are no people matching the current search criteria</p> */}
              {peoples.length > 0 && !error && !loader && (
                <PeopleTable
                  sortedPeople={sortedPeople}
                  getSortIcon={getSortIcon}
                  peoples={peoples}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
