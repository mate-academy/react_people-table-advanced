import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPeopleList, setCurrentPeopleList] = useState<Person[]>(people);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPeopleList(people);
  }, [people]);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                people={people}
                setCurrentPeopleList={setCurrentPeopleList}
                searchParams={searchParams}
                setSearchWith={setSearchWith}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable
                  peopleList={currentPeopleList}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
