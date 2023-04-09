import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import {
  getFilteredPeople,
  getPeopleWithParents,
} from '../../helpers/helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = useMemo(() => (
    getFilteredPeople(
      people,
      sex,
      query,
      centuries,
      sortBy,
      order,
    )
  ), [sex, query, centuries, sortBy, order]);

  const loadPeople = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = getPeopleWithParents(peopleFromServer);

      setPeople(preparedPeople);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const hasNoPeopleOnServer = !isLoading && !hasError && !people.length;

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {hasNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!filteredPeople.length && !isLoading) && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {people.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
