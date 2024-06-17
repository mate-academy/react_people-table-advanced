import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [initialPeoples, setInitialPeoples] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopless => {
        setPeoples(peopless);
        setInitialPeoples(peopless);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isError && !loading && (
              <PeopleFilters
                setPeoples={setPeoples}
                peoples={initialPeoples}
                searchParams={searchParams}
                setSearchWith={setSearchWith}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {initialPeoples.length === 0 && !isError && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {peoples.length === 0 && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isError && !loading && peoples.length > 0 && (
                <PeopleTable
                  peoples={peoples}
                  searchParams={searchParams}
                  setSearchWith={setSearchWith}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
