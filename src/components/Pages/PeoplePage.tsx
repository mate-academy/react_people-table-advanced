import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { filteredPeople } from '../../utils/filteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const updatePeopleList = async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    updatePeopleList();
  }, []);

  const getFilteredPeople = useMemo(() => (
    filteredPeople(people, query, sex, centuries, sort, order)
  ), [people, query, sex, centuries, sort, order]);

  const isTableEmpty = getFilteredPeople.length === 0
    && !hasError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && (
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

              {isTableEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {getFilteredPeople.length > 0 && !hasError
                && <PeopleTable people={getFilteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
