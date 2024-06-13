import { useMemo, useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  //object
  const sexSearchParams = searchParams.get('sex') || '';
  const querySearchParams = searchParams.get('query') || '';
  const centurySearchParams = searchParams.getAll('century');
  const sortedBySearchParams = searchParams.get('sort') || '';
  const sortOrderSearchParams = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getPreparedPeopleArr = useCallback(
    (peopleArr: Person[]) => {
      let filteredPeople = [...peopleArr];

      if (sexSearchParams) {
        filteredPeople = filteredPeople.filter(
          person => person.sex === sexSearchParams,
        );
      }

      if (querySearchParams) {
        filteredPeople = filteredPeople.filter(
          person =>
            person.name.toLowerCase().includes(querySearchParams) ||
            person.motherName?.toLowerCase().includes(querySearchParams) ||
            person.fatherName?.toLowerCase().includes(querySearchParams),
        );
      }

      if (centurySearchParams.length) {
        filteredPeople = filteredPeople.filter(person =>
          centurySearchParams.includes(`${Math.ceil(person.born / 100)}`),
        );
      }

      if (sortedBySearchParams) {
        filteredPeople.sort((person1, person2) => {
          switch (sortedBySearchParams) {
            case 'name':
            case 'sex':
              return person1[sortedBySearchParams].localeCompare(
                person2[sortedBySearchParams],
              );

            case 'born':
            case 'died':
              return (
                person1[sortedBySearchParams] - person2[sortedBySearchParams]
              );

            default:
              return 0;
          }
        });
      }

      if (sortOrderSearchParams) {
        filteredPeople.reverse();
      }

      return filteredPeople;
    },
    [
      sexSearchParams,
      querySearchParams,
      centurySearchParams,
      sortedBySearchParams,
      sortOrderSearchParams,
    ],
  );

  const preparedPeople = useMemo(
    () => getPreparedPeopleArr(people),
    [getPreparedPeopleArr, people],
  );

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

              {people.length !== 0 && !isLoading && !isError && (
                <PeopleTable people={preparedPeople} />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {preparedPeople.length === 0 && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
