import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { addParents } from '../utils/helpers';
import { getPeople } from '../api';
import { Loader } from './Loader/Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { applyFilterAndSort } from '../utils/filterAndSortHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleFromServer) => setPeople(addParents(peopleFromServer)))
      .catch(() => {
        setIsLoadError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    return applyFilterAndSort(people, searchParams);
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isLoadError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isLoadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && !isLoading && !isLoadError && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !isLoadError && !!visiblePeople.length && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
