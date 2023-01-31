import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

enum SortBy {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMatchedPeople, setHasMatchedPeople] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = Object.values(SortBy).find(
    item => item === searchParams.get('sort'),
  );
  const order = searchParams.get('order') || '';

  const handleFilterByQuery = (
    peopleArrayToSort: Person[],
    queryValue?: string,
    sexValue?: string,
    centuriesArray?: string[],
    sortBy?: SortBy,
    orderType?: string,
  ) => {
    if (
      !queryValue && !sexValue && !centuriesArray && !sortBy && !orderType
    ) {
      setFilteredPeople(peopleArrayToSort);
      setHasMatchedPeople(true);

      return;
    }

    let filteredArray;

    if (queryValue) {
      const queryInput = queryValue.toLowerCase();

      filteredArray = peopleArrayToSort.filter(person => {
        const personName = person.name.toLowerCase();
        const motherName = person.motherName
          ? person.motherName.toLowerCase()
          : '';
        const fatherName = person.fatherName
          ? person.fatherName.toLowerCase()
          : '';

        return (personName.includes(queryInput)
          || motherName.includes(queryInput)
          || fatherName.includes(queryInput));
      });
    } else {
      filteredArray = [...peopleArrayToSort];
    }

    if (sexValue) {
      filteredArray = filteredArray.filter(person => person.sex === sexValue);
    }

    if (centuriesArray && centuriesArray.length > 0) {
      filteredArray = filteredArray.filter(person => {
        return centuriesArray.includes(
          (Math.ceil(person.born / 100)).toString(),
        );
      });
    }

    if (!sortBy) {
      setFilteredPeople(filteredArray);
    }

    if (sortBy && !orderType) {
      const ascSortedArray = [...filteredArray].sort(
        (personA: Person, personB: Person) => {
          if (sortBy === SortBy.Born || sortBy === SortBy.Died) {
            return personA[sortBy] - personB[sortBy];
          }

          return personA[sortBy].localeCompare(personB[sortBy]);
        },
      );

      setFilteredPeople(ascSortedArray);
    }

    if (sortBy && orderType) {
      const descSortedArray = [...filteredArray].sort((personA, personB) => {
        if (sortBy === SortBy.Born || sortBy === SortBy.Died) {
          return personB[sortBy] - personA[sortBy];
        }

        return personB[sortBy].localeCompare(personA[sortBy]);
      });

      setFilteredPeople(descSortedArray);
    }

    setHasMatchedPeople(filteredArray.length > 0);
  };

  const handleLoading = async () => {
    try {
      setIsLoading(true);

      const peopleFromServer = await getPeople();

      setIsLoading(false);
      setIsInitialized(true);
      setPeople(peopleFromServer);

      if (query || sex || centuries || sort || order) {
        handleFilterByQuery(
          peopleFromServer, query, sex, centuries, sort, order,
        );
      } else {
        setFilteredPeople(peopleFromServer);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      handleLoading();
    }

    handleFilterByQuery(people, query, sex, centuries, sort, order);
  }, [location]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && (
                !people.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (hasMatchedPeople && (
                  <PeopleTable
                    people={people}
                    filteredPeople={filteredPeople}
                  />
                )
                )
              )}

              {!isLoading && !isError && !hasMatchedPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
