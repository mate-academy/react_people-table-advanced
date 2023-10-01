import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { applySearchAndFilter } from '../utils/applySearchAndFilter';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const visiblePeople = applySearchAndFilter(people, searchParams);

  const isSuccessfullyLoaded = !hasError && !isPeopleLoading;

  useEffect(() => {
    setIsPeopleLoading(true);

    const fetchPeople = async () => {
      try {
        const peopleFromServer = await getPeople();
        const preparedPeople = getPreparedPeople(peopleFromServer);

        setPeople(preparedPeople);
      } catch {
        setHasError(true);
      } finally {
        setIsPeopleLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {isSuccessfullyLoaded && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isSuccessfullyLoaded && !visiblePeople.length && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isSuccessfullyLoaded && Boolean(visiblePeople.length) && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
