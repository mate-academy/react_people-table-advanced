import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = () => {
      getPeople()
        .then(peopleList => {
          setPeople(peopleList);
          setIsError(false);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              people={people}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && !isError && !isLoading && (
                <PeopleTable
                  people={people}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
