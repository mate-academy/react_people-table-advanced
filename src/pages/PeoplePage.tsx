import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleTable } from './../components/PeopleTable/PeopleTable';
import { Person } from './../types';
import { getPeople } from './../api';
import { Loader } from './../components/Loader';
import { PeopleFilters } from './../components/PeopleFilters';
import { SortTypes } from './../types/SortTypes';
import { Filters } from './../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  function loadPeople() {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoaded(true);
      });
  }

  useEffect(loadPeople, []);

  const newSearchParams = new URLSearchParams(searchParams);

  function isQueryIncluded(man: Person, chars: string): boolean {
    const normalizedChars = chars.toLowerCase();
    const { name, fatherName, motherName } = man;
    const allNames = [name, fatherName, motherName];

    const mentionedNames = allNames.filter(item => typeof item === 'string');

    return mentionedNames.some(mentionedName =>
      mentionedName.toLowerCase().includes(normalizedChars),
    );
  }

  function isBornInCentury(man: Person, checkedCentury: string): boolean {
    const { born } = man;
    const centuryBirth = Math.ceil(+born / 100);

    return +checkedCentury === centuryBirth;
  }

  function getFilteredPeople(newParams: URLSearchParams): Person[] {
    let currentPeople = [...people];

    Array.from(newParams.entries()).forEach(([key, value]) => {
      let filteredPeople: Person[] = [];

      switch (key) {
        case Filters.Sex:
          filteredPeople = currentPeople.filter(person => person.sex === value);

          currentPeople = [...filteredPeople];

          return;

        case Filters.Query:
          filteredPeople = currentPeople.filter(person =>
            isQueryIncluded(person, value),
          );
          currentPeople = [...filteredPeople];

          return;

        case Filters.Centuries:
          const centuries = newParams.getAll(Filters.Centuries);

          const peopleByCenturies = centuries.map(century =>
            currentPeople.filter(person => isBornInCentury(person, century)),
          );

          filteredPeople = peopleByCenturies.reduce(
            (peopleTotal, peopleByCentury) => [
              ...peopleTotal,
              ...peopleByCentury,
            ],
            [],
          );
          currentPeople = [...filteredPeople];

          return;

        default:
          return;
      }
    });

    return currentPeople;
  }

  const isParam = (searchParam: string) => {
    return searchParams.has(searchParam);
  };

  const paramValue = (searchParam: string) => {
    return searchParams.get(searchParam);
  };

  const sortField = isParam('sort') ? paramValue('sort') : null;
  const sortOrder = isParam('order') ? paramValue('order') : null;

  function getSortedPeople(
    currentPeople: Person[],
    currentSort: string | null,
  ): Person[] {
    return currentPeople.toSorted((person1, person2) => {
      switch (currentSort) {
        case SortTypes.Name:
          return person1.name.localeCompare(person2.name);

        case SortTypes.Sex:
          return person1.sex.localeCompare(person2.sex);

        case SortTypes.Born:
          return person1.born - person2.born;

        case SortTypes.Died:
          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

  function getVisiblePeople(
    newParams: URLSearchParams,
    sort: string | null,
    order: string | null,
  ) {
    const filteredPeople = getFilteredPeople(newParams);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sortedPeople = useMemo(
      () => getSortedPeople(filteredPeople, sort),
      [filteredPeople, sort],
    );

    const preparedPeople = sort === null ? filteredPeople : sortedPeople;

    return order === 'desc' ? preparedPeople.toReversed() : preparedPeople;
  }

  const visiblePeople = getVisiblePeople(newSearchParams, sortField, sortOrder);

  const isLoadedWithoutError = isLoaded && !errorMessage;
  const hasError = !isLoading && errorMessage;
  const noPeople = isLoadedWithoutError && people.length === 0;
  const hasPeople = isLoadedWithoutError && visiblePeople.length > 0;
  const noPeopleByFilter = isLoadedWithoutError && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {noPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noPeopleByFilter && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={personSlug}
                  sortField={sortField}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
