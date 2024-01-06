import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader, PeopleTable, PeopleFilters } from '../components';
import { getPeople } from '../api';
import { Person, SearchParamsType } from '../types';
import { getNormalizedPeople, getPreperedPeople } from '../utils';
import { Centuries, SearchParams } from '../enums';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(() => {
    const params: SearchParamsType = Object.fromEntries(searchParams.entries());

    const centuries = searchParams.getAll(
      SearchParams.Centuries,
    ) as Centuries[];

    return getPreperedPeople(people, { ...params, centuries });
  }, [people, searchParams]);

  useEffect(() => {
    getPeople()
      .then((response) => {
        const normalizedPeople = getNormalizedPeople(response);

        setPeople(normalizedPeople);
      })
      .catch(() => {
        setHasLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isLoaded = !isLoading && !hasLoadingError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isLoaded && (
                people.length ? (
                  <>
                    <PeopleTable people={visiblePeople} />
                  </>
                ) : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
