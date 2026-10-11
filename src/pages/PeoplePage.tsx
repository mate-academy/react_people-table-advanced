import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '../types/Filtres';
import { filterPeople } from '../utils/filtres';
import { sortPeople } from '../utils/sortPeople';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const filterSex = searchParams.get('sex') || Filters.All;
  /* eslint-disable */
  const visiblePeople = peopleFromServer
    ? filterPeople(peopleFromServer, {
        sex: filterSex,
        query: searchParams.get('query') || '',
        centuries: searchParams.getAll('centuries'),
      })
    : [];
  /* eslint-enable */
  const sortedPeople = sortPeople(
    visiblePeople,
    searchParams.get('sort'),
    searchParams.get('order'),
  );

  useEffect(() => {
    getPeople()
      .then(resolve => setPeopleFromServer(resolve))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage.length > 0 && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!loading && peopleFromServer?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {/* <p>There are no people matching the current search criteria</p> */}
              {sortedPeople && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
