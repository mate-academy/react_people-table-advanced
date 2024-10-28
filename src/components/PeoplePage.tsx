import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/GetPreparedPeople';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { FilterParams } from '../types/FilterParams';
import { getSortedPeople } from '../utils/getSortedPeople';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loadFail, setLoadFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { chosenId } = useParams();

  const sortParams = {
    sort: searchParams.get('sort') || '',
    order: searchParams.get('order') || '',
  };

  const filterParams: FilterParams = {
    centuries: searchParams.getAll('centuries') || [],
    sex: searchParams.get('sex') || '',
    query: searchParams.get('query') || '',
  };

  const isCompletedLoadingWithoutFails =
    !isLoading && !people.length && !loadFail;

  const isSuccessfullyLoadedListWithPeople = !isLoading && !!people.length;

  const filteredPeople = getFilteredPeople(filterParams, people);
  const sortedPeople = getSortedPeople(sortParams, filteredPeople);

  const isFilteredPeople = !!people.length && !filteredPeople.length;

  useEffect(() => {
    setIsLoading(true);
    setLoadFail(false);
    getPeople()
      .then(res => {
        setPeople(() => getPreparedPeople(res));
      })
      .catch(() => setLoadFail(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isSuccessfullyLoadedListWithPeople && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {loadFail && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isCompletedLoadingWithoutFails && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isFilteredPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isSuccessfullyLoadedListWithPeople && !isFilteredPeople && (
                <PeopleTable
                  searchParams={searchParams}
                  chosenId={chosenId}
                  people={sortedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
