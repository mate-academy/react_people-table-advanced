/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isErrorActive, setIsErrorActive] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex') || null;
  const sortFilter = searchParams.get('sort') || null;
  const orderFilter = searchParams.get('order') || null;
  const queryFilter = searchParams.get('query') || '';
  const centuriesFilter = searchParams.getAll('centuries') || [];

  const nameSort = 'name';
  const sexSort = 'sex';
  const bornSort = 'born';
  const diedSort = 'died';

  const getFilteredPeople = () => {
    let newPeople = [...people];

    if (sexFilter) {
      newPeople = newPeople.filter(({ sex }) => sex === sexFilter);
    }

    if (queryFilter) {
      const query = queryFilter.toLowerCase();

      newPeople = newPeople.filter(({ name, motherName, fatherName }) => {
        const isNameIncludes = name.toLowerCase().includes(query);
        const isMotherNameIncludes = motherName?.toLowerCase().includes(query);
        const isFatherNameIncludes = fatherName?.toLowerCase().includes(query);

        return isNameIncludes || isMotherNameIncludes || isFatherNameIncludes;
      });
    }

    if (centuriesFilter.length) {
      newPeople = newPeople.filter((person) => {
        const century = Math.ceil(person.born / 100).toString();

        return centuriesFilter.includes(century);
      });
    }

    if (sortFilter) {
      switch (sortFilter) {
        case nameSort:
          newPeople = newPeople.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case sexSort:
          newPeople = newPeople.sort((a, b) => a.sex.localeCompare(b.sex));
          break;
        case bornSort:
          newPeople = newPeople.sort((a, b) => a.born - b.born);
          break;
        case diedSort:
          newPeople = newPeople.sort((a, b) => a.died - b.died);
          break;
        default:
          return newPeople;
      }
    }

    if (orderFilter) {
      newPeople.reverse();
    }

    return newPeople;
  };

  const filteredPeople = getFilteredPeople();

  useEffect(() => {
    getPeople()
      .then((data) => setPeople(data))
      .catch(() => setIsErrorActive(true))
      .finally(() => setIsLoaderActive(false));
  }, []);

  const isErrorMessageShow = !isLoaderActive && isErrorActive;
  const isPeopleNotExist = !isLoaderActive && people.length === 0;
  const isPeopleNotMatching = !isLoaderActive && filteredPeople.length === 0;
  const isPeopleExist = !isLoaderActive && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleExist && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoaderActive && <Loader />}

              {isErrorMessageShow && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isPeopleNotExist && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleNotMatching && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isPeopleNotMatching && isPeopleExist && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
