import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Errors } from '../utils/errors';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (loadingError) {
    return <p data-cy="peopleLoadingError">{Errors.LOADING_FAIL}</p>;
  }

  if (people?.length === 0) {
    return <p data-cy="noPeopleMessage">{Errors.NO_PEOPLE_ON_SERVER}</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          {people && (
            <div className="column">
              <div className="box table-container">
                <PeopleTable people={people} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
