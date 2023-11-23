import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { normalizePeople } from '../utils/normalizePeople';
import { PeopleFilters } from './PeopleFilters';
import { preparationPeople } from '../utils/preparationPeople';
import { Person } from '../types/Person/Person';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(peopleFromServer => setPeople(normalizePeople(peopleFromServer)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();

  const visiblePeople = preparationPeople(people, searchParams);

  if (isLoading || isError) {
    return (
      <>
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </>
    );
  }

  const noPeopleMessage = searchParams.get('query')
    ? 'There are no people matching the current search criteria'
    : 'There are no people on the server';

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
              {visiblePeople.length ? (
                <PeopleTable people={visiblePeople} />
              ) : (
                <p data-cy="noPeopleMessage">
                  {noPeopleMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
