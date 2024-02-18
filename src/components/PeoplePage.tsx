import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const currentCenturies = searchParams.getAll('centuries') || [];

  const getFilteredPeople = (peopleToFitler: Person[]) => {
    let filteredPeople = peopleToFitler;

    if (currentQuery) {
      const normalizedQuery = currentQuery.toLowerCase();

      filteredPeople = filteredPeople.filter((person) => {
        const { name, fatherName, motherName } = person;
        const normalizedName = name.toLowerCase();
        const normalizedFatherName = fatherName?.toLowerCase();
        const normalizedMotherName = motherName?.toLowerCase();

        return (
          normalizedName.includes(normalizedQuery)
          || normalizedFatherName?.includes(normalizedQuery)
          || normalizedMotherName?.includes(normalizedQuery)
        );
      });
    }

    if (currentSex) {
      filteredPeople = filteredPeople
        .filter((person) => person.sex === currentSex);
    }

    if (currentCenturies.length) {
      const normalizedCenturies = currentCenturies
        .map((century) => +century * 100);

      filteredPeople = filteredPeople.filter((person) => {
        const { born } = person;

        return normalizedCenturies.some((century) => {
          return born <= century && born >= century - 100;
        });
      });
    }

    switch (currentSort) {
      case 'name':
      case 'sex':
        filteredPeople = filteredPeople.sort((a, b) => {
          return a[currentSort].localeCompare(b[currentSort]);
        });
        break;

      case 'born':
      case 'died':
        filteredPeople = filteredPeople.sort((a, b) => {
          return a[currentSort] - b[currentSort];
        });
        break;

      default:
        break;
    }

    if (currentOrder) {
      filteredPeople = filteredPeople.reverse();
    }

    return filteredPeople;
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = getFilteredPeople(people);

  const isNoPeople = !isLoading && !isError && !people.length;
  const isPeople = !isLoading && !isError && !!people.length;
  const isFilteredPeople = !isLoading && !isError && !!filteredPeople.length;
  const isNoFilteredPeople = !isLoading && !isError && !filteredPeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoFilteredPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isFilteredPeople && (
                <PeopleTable
                  people={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
