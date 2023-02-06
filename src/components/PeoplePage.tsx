import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { person: selectedPersonSlug = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const [hasError, setHasError] = useState(false);

  const hasReceivedNoData = hasLoadedData && !people.length;
  const isFilterVisible = hasLoadedData && people.length;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setHasLoadedData(true);
        setPeople(peopleFromServer);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isFilterVisible && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasReceivedNoData && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}



              <PeopleTable
                people={people}
                selectedPersonSlug={selectedPersonSlug}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
