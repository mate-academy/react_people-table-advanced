import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { ErrorType } from '../types/ErrorType';
import { Person } from '../types';
import { getPeople } from '../api';
import { filteringPeople } from '../utils/filteringPeople';
import { sortingPeople } from '../utils/sortingPeople';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<ErrorType>(ErrorType.NONE);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sex = searchParams.get('sex') || '';

  useEffect(() => {
    const showError = setTimeout((error: ErrorType) => setIsError(error), 3000);

    return () => {
      clearTimeout(showError);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        const personWithParents = data.map(person => {
          const mother = data.find((motherFound) => {
            return motherFound.name === person.motherName;
          });
          const father = data.find((fatherFound) => {
            return fatherFound.name === person.fatherName;
          });

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(personWithParents);
      })
      .catch(() => setIsError(ErrorType.LOAD))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    return filteringPeople(people, sex, query, centuries);
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return sortingPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith((searchParams), { query: event.target.value || null }),
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !!people.length && (
              <PeopleFilters
                query={query}
                onChangeQuery={handleChangeQuery}
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError">
                  {isError}
                </p>
              )}

              {!people.length && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!sortedPeople.length && !isLoading && !isError && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !isError && !!sortedPeople.length && (
                <PeopleTable
                  people={sortedPeople}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
