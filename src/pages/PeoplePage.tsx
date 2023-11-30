import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';
import { filterPeopleList } from '../utils/searchHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then((receivedPeople) => {
        setPeople(receivedPeople);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = [...filterPeopleList(people, searchParams)];

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading
        ? <Loader />
        : (
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              {people.length !== 0 && (
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>
              )}

              <div className="column">
                <div className="box table-container">

                  {isError && (
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  )}

                  {(!people.length && !isError) && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {visiblePeople.length
                    ? <PeopleTable people={visiblePeople} />
                    : !isError && (
                      <p data-cy="noPeopleMessage">
                        There are no people matching the current search criteria
                      </p>
                    )}

                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
