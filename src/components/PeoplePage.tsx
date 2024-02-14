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

  const noPeopleOnServer = !people.length && !isLoading && !isError;
  const loadError = isError && !isLoading;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const filterOptions = {
    sex: searchParams.get('sex'),
    name: searchParams.get('query'),
    centuries: searchParams.getAll('centuries'),
  };
  const sortOptions = {
    column: searchParams.get('sort'),
    order: searchParams.get('order'),
  };

  const preparedPeople = preparePeople(people, filterOptions, sortOptions);
  const noMatchPeople = !preparedPeople.length && !isLoading && !isError;
  const showPeople = !isLoading && !isError && !!preparedPeople.length;

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

              {loadError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatchPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showPeople && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
