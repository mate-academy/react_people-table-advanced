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

  const searchParamsMap = {
    sex: searchParams.get('sex') || '',
    query: searchParams.get('query') || '',
    century: searchParams.getAll('century'),
    sortedBy: searchParams.get('sort') || '',
    sortOrder: searchParams.get('order') || '',
  };

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

      if (searchParamsMap.sex) {
        filteredPeople = filteredPeople.filter(
          person => person.sex === searchParamsMap.sex,
        );
      }

      if (searchParamsMap.query) {
        const normalizedQuery = searchParamsMap.query.toLowerCase();

        filteredPeople = filteredPeople.filter(
          person =>
            person.name.toLowerCase().includes(normalizedQuery) ||
            person.motherName?.toLowerCase().includes(normalizedQuery) ||
            person.fatherName?.toLowerCase().includes(normalizedQuery),
        );
      }

      if (searchParamsMap.century.length) {
        filteredPeople = filteredPeople.filter(person =>
          searchParamsMap.century.includes(`${Math.ceil(person.born / 100)}`),
        );
      }

      if (searchParamsMap.sortedBy) {
        filteredPeople.sort((person1, person2) => {
          switch (searchParamsMap.sortedBy) {
            case 'name':
            case 'sex':
              return person1[searchParamsMap.sortedBy].localeCompare(
                person2[searchParamsMap.sortedBy],
              );

            case 'born':
            case 'died':
              return (
                person1[searchParamsMap.sortedBy] -
                person2[searchParamsMap.sortedBy]
              );

            default:
              return 0;
          }
        });
      }

      if (searchParamsMap.sortOrder) {
        filteredPeople.reverse();
      }

      return filteredPeople;
    },
    [
      searchParamsMap.sex,
      searchParamsMap.query,
      searchParamsMap.century,
      searchParamsMap.sortedBy,
      searchParamsMap.sortOrder,
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
