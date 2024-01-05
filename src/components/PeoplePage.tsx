import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(response => {
        const peopleFromServer = response.map(person => {
          const father = response
            .find(currentPerson => currentPerson.name === person.fatherName);
          const mother = response
            .find(currentPerson => currentPerson.name === person.motherName);

          return ({
            ...person,
            father,
            mother,
          });
        });

        return peopleFromServer;
      })
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getPreparedPeople = () => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.trim().toLowerCase() ?? '';
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    const filteredPeople = people.filter((person: Person) => {
      const lowerCaseName = person.name.toLowerCase();
      const lowerCaseMotherName = person.motherName?.toLowerCase();
      const lowerCaseFatherName = person.fatherName?.toLowerCase();
      const inCentury = centuries.length === 0
        || centuries.includes(Math.ceil(person.born / 100).toString());

      return (lowerCaseName.includes(query)
        || lowerCaseMotherName?.includes(query)
        || lowerCaseFatherName?.includes(query)
        || !query)
        && (!sex || person.sex === sex)
        && inCentury;
    });

    if (sort) {
      const compareFunction = (a: Person, b: Person) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          case 'born':
          case 'died':
            return a[sort] - b[sort];
          default:
            return 0;
        }
      };

      filteredPeople.sort(compareFunction);

      if (order === 'desc') {
        filteredPeople.reverse();
      }
    }

    return filteredPeople;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (<PeopleFilters />)}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!isLoading && !hasError && people.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noSearchResults && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0 && (
                <PeopleTable
                  peopleFromServer={getPreparedPeople()}
                  setNoResults={setNoSearchResults}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
