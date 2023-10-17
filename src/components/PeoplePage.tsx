import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { clientGet } from '../utils/fetchClient';
import { filterPeople } from '../utils/filteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    clientGet<Person[]>()
      .then(setPeople)
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(people, {
      query,
      centuries,
      sex,
      sort,
      order,
    });
  }, [people, query, centuries, sex, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoadingError ? (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                ) : (
                  <>
                    {people.length ? (
                      <>
                        {filteredPeople.length ? (
                          <PeopleTable
                            people={filteredPeople}
                            allPeople={people}
                            order={order}
                            sort={sort}
                            searchParams={searchParams}
                          />
                        ) : (
                          <p>
                            There are no people matching
                            the current search criteria
                          </p>
                        )}
                      </>
                    ) : (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
