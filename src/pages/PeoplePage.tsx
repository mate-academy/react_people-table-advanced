import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { getParents } from '../utils/getParentsFuncts';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [search] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => (
        setPeople(getParents(peopleFromServer))
      ))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = search.get('query') || '';
  const sex = search.get('sex') || null;
  const centuries = search.getAll('centuries') || [];
  const sort = search.get('sort');
  const order = search.get('order');

  const filteredPeople = getPreparedPeople(
    people,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  const isNoPeople = !people.length && !isLoading && !isError;
  const isNoVissiblePeople = !filteredPeople.length && !isLoading && !isError;
  const isErrorMessage = isError && !isLoading;
  const isDisplayPeople = !!people.length && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isDisplayPeople && (
                <PeopleTable people={filteredPeople} />
              )}

              {isNoVissiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
