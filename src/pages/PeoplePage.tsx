import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleTable } from './../components/PeopleTable/PeopleTable';
import { Person } from './../types';
import { getPeople } from './../api';
import { Loader } from './../components/Loader';
import { PeopleFilters } from './../components/PeopleFilters';

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

  function getFilteredPeople(newParams: URLSearchParams) {
    let currentPeople = [...people];

    Array.from(newParams.entries()).forEach(([key, value]) => {
      let filteredPeople: Person[] = [];

      switch (key) {
        case 'sex':
          filteredPeople = currentPeople.filter(person => person.sex === value);

          currentPeople = [...filteredPeople];

          return;

        case 'query':
          filteredPeople = currentPeople.filter(person =>
            isQueryIncluded(person, value),
          );
          currentPeople = [...filteredPeople];

          return;

        case 'centuries':
          const centuries = newParams.getAll('centuries');

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
    // order: string | null,
  ) {
    // const preparedPeople = [...currentPeople];

    return currentPeople.toSorted((person1, person2) => {
      switch (currentSort) {
        case 'name':
          return person1.name.localeCompare(person2.name);

        case 'sex':
          return person1.sex.localeCompare(person2.sex);

        case 'born':
          return person1.born - person2.born;

        case 'died':
          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

  // function getSortedPeople(
  //   currentPeople: Person[],
  //   sort: string | null,
  //   order: string | null,
  // ) {
  //   const preparedPeople = [...currentPeople];

  //   if (sort !== null && order === null) {
  //     preparedPeople.sort((person1, person2) => {
  //       switch (sort) {
  //         case 'name':
  //           return person1.name.localeCompare(person2.name);

  //         case 'sex':
  //           return person1.sex.localeCompare(person2.sex);

  //         case 'born':
  //           return person1.born - person2.born;

  //         case 'died':
  //           return person1.died - person2.died;

  //         default:
  //           return 0;
  //       }
  //     });
  //   }

  //   return preparedPeople;
  // }

  function getVisiblePeople(
    newParams: URLSearchParams,
    sort: string | null,
    order: string | null,
  ) {
    const filteredPeople = getFilteredPeople(newParams);

    const preparedPeople =
      sort === null ? filteredPeople : getSortedPeople(filteredPeople, sort);

    return order === 'desc' ? preparedPeople.toReversed() : preparedPeople;
  }

  const visiblePeople = getVisiblePeople(newSearchParams, sortField, sortOrder);

  const noPeople =
    !isLoading && isLoaded && !errorMessage && people.length === 0;
  const hasError = !isLoading && errorMessage;
  const hasPeople = !hasError && visiblePeople.length > 0;
  const noPeopleByFilter = !hasError && visiblePeople.length === 0;
  // const hasPeople = !isLoading && !errorMessage && visiblePeople.length > 0;
  // const noPeopleByFilter =
  //   !isLoading && !errorMessage && visiblePeople.length === 0;

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
