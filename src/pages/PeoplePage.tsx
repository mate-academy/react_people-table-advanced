import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);

  const chechOnErrorMessage = !people.length && !isLoading && !isError;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(persons => {
        setIsError(false);
        setPeople(persons);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filterPeopleHandler = (persons: Person[]) => {
    let filteredArray = [...persons];

    const sexFilterValue = searchParams.get('sex');

    const queryField = searchParams.get('query');

    const centuryArr = searchParams.getAll('centuries');

    const sortField = searchParams.get('sort');

    const descField = searchParams.get('order');

    if (sexFilterValue === 'm') {
      filteredArray = filteredArray.filter(person => person.sex === 'm');
    }

    if (sexFilterValue === 'f') {
      filteredArray = filteredArray.filter(person => person.sex === 'f');
    }

    if (queryField?.length) {
      filteredArray = filteredArray.filter(person =>
        (
          person.name.toLowerCase() ||
          person.motherName?.toLowerCase() ||
          person.fatherName?.toLowerCase()
        )?.includes(queryField),
      );
    }

    if (centuryArr.length) {
      filteredArray = filteredArray.filter(person =>
        centuryArr.includes('' + Math.ceil(person.born / 100)),
      );
    }

    if (sortField) {
      switch (sortField) {
        case 'sex':
        case 'name':
          return (filteredArray = filteredArray.sort((person1, person2) =>
            person1[sortField].localeCompare(person2[sortField]),
          ));
        case 'born':
        case 'died':
          filteredArray = filteredArray.sort(
            (person1, person2) => person1[sortField] - person2[sortField],
          );
      }
    }

    if (descField) {
      return (filteredArray = filteredArray.reverse());
    }

    return filteredArray;
  };

  const preparedPeopleInfo = filterPeopleHandler(people);

  const checkForUserOnServer = !!preparedPeopleInfo.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {chechOnErrorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!preparedPeopleInfo.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {checkForUserOnServer && (
                <PeopleTable people={preparedPeopleInfo} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
