import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../utils/people';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [searchParams] = useSearchParams();

  const filteredPeople = useMemo(() => {
    const filterOptions = {
      sex: searchParams.get('sex'),
      searchTerm: searchParams.get('searchTerm'),
      selectedCenturies: searchParams.getAll('centuries'),
      sortBy: searchParams.get('sort'),
      sortOrder: searchParams.get('order'),
    };

    return getPreparedPeople(peopleData, filterOptions);
  }, [peopleData, searchParams]);

  const isDataLoaded = !loadingError && !loading;
  const hasPeopleData = !!peopleData.length;

  const noMatch = hasPeopleData && !filteredPeople.length && isDataLoaded;

  const shouldShowPeopleTable = hasPeopleData && isDataLoaded && !noMatch;

  useEffect(() => {
    setLoadingError(false);
    setLoading(true);

    getPeople()
      .then(retrievedPeople => setPeopleData(retrievedPeople))
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isDataLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {loadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!peopleData.length && isDataLoaded && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {shouldShowPeopleTable && (
                <PeopleTable
                  people={peopleData}
                  visiblePeople={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
