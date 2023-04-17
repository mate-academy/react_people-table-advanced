import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { filterPeople } from './helpers/filterPeople';
import { sortPeople } from './helpers/sortPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { slug = '' } = useParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const fetchPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const filteredPeople = useCallback(() => (
    filterPeople(sex, query, centuries, people)),
  [sex, query, centuries, people]);

  const sortedPeople = useCallback(() => (
    sortPeople(filteredPeople(), sort, order)
  ), [filteredPeople(), sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {hasError && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Unable to load people from server
                      </p>
                    )}

                    {people.length === 0
                      ? (
                        <p data-cy="noPeopleMessage">
                          No people loaded from server
                        </p>
                      ) : ''}

                    <PeopleTable
                      people={sortedPeople()}
                      selectedSlug={slug}
                    />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
