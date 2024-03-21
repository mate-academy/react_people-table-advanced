import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { SOMETHING_WENT_WRONG_ERROR } from '../../constants/errors';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const filters = {
      sex: searchParams.get('sex'),
      name: searchParams.get('query'),
      centuries: searchParams.getAll('centuries'),
    };

    return getFilteredPeople(people, filters);
  }, [searchParams, people]);

  const sortedPeople = useMemo(() => {
    const column = searchParams.get('sort');
    const order = searchParams.get('order');

    return getSortedPeople(filteredPeople, column, order);
  }, [searchParams, filteredPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {SOMETHING_WENT_WRONG_ERROR}
                </p>
              )}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && !!filteredPeople.length && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
