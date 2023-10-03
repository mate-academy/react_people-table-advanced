import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PageTitle } from '../../components/PageTitle';
import { Table } from '../../components/Table';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { applySearchAndFilter } from '../../utils/applySearchAndFilter';
import {
  ERROR_MESSAGE,
  NO_PEOPLE_MESSAGE,
  NO_MATCHING_PEOPLE_MESSAGE,
} from '../../utils/constants';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const visiblePeople = applySearchAndFilter(people, searchParams);

  const isLoaded = !hasError && !isLoading;

  const fetchPeople = async () => {
    try {
      setHasError(false);
      setIsLoading(true);

      const peopleFromServer = await getPeople();
      const preparedPeople = getPreparedPeople(peopleFromServer);

      setPeople(preparedPeople);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <PageTitle title="People Page" />

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError
                && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {ERROR_MESSAGE}
                  </p>
                )}

              {isLoaded && !people.length
                && (
                  <p data-cy="noPeopleMessage">
                    {NO_PEOPLE_MESSAGE}
                  </p>
                )}

              {isLoaded && !visiblePeople.length && (
                <p>
                  { NO_MATCHING_PEOPLE_MESSAGE }
                </p>
              )}

              {isLoaded && !!people.length && (
                <Table people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
