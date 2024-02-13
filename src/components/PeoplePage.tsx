import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { preparePeople } from '../utils/peopleHelpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const options = {
    sex: searchParams.get('sex'),
    name: searchParams.get('query'),
    centuries: searchParams.getAll('centuries'),
    column: searchParams.get('sort'),
    order: searchParams.get('order'),
  };

  const preparedPeople = preparePeople(people, options);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(!isLoading && !isError) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {(isError && !isLoading) && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {(!people.length && !isLoading && !isError) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!preparedPeople.length && !isLoading && !isError) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {(!isLoading && !isError && !!preparedPeople.length) && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
