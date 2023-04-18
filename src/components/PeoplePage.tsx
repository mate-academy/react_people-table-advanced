import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { filterPeople, sortPeople } from '../helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug = '' } = useParams();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    const getPeopleFromServer = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setHasError(true);
      }

      setIsLoading(false);
    };

    getPeopleFromServer();
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(people, sex, query, centuries);
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              sex={sex}
              query={query}
              centuries={centuries}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {hasError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {people.length <= 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {filteredPeople.length <= 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {!hasError && sortedPeople.length > 0 && (
                    <PeopleTable people={sortedPeople} personId={slug} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
