import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { usePeopleContext } from '../providers/AppProvider';
import { getPeopleFiltered } from '../utils/Filters';

export const PeoplePage = () => {
  const {
    people, setPeople, isLoading, setIsLoading,
  } = usePeopleContext();
  const [error, setError] = useState<string>('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadPeople = async () => {
      const data = await getPeople();

      setPeople(data);
    };
  
    if (people.length === 0) {
      setIsLoading(true);
    }

    loadPeople()
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const showNoPeopleMessage = getPeopleFiltered(people,
    searchParams.get('sex'),
    searchParams.get('query'),
    searchParams.getAll('centuries'),
    searchParams.get('sortBy'),
    searchParams.get('sortOrder')).length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters /> }
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error
                && <p data-cy="peopleLoadingError">Something went wrong</p>}
              {people.length === 0 && !isLoading
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              {showNoPeopleMessage && !isLoading
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {people.length > 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
