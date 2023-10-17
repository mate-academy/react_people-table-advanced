import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { clientGet } from '../utils/fetchClient';
import { filterPeople } from '../utils/filteredPeople';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { QueryParams } from '../types/filterParams';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.Query) || '';
  const sex = searchParams.get(QueryParams.Sex) || '';
  const centuries = searchParams.getAll(QueryParams.Centuries) || [];
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';

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

  const setSearchWith = (params: SearchParams) => {
    const newSearch = getSearchWith(searchParams, params);

    setSearchParams(newSearch.toString());
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                setSearchWith={setSearchWith}
                centuries={centuries}
                sex={sex}
              />
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
                            setSearchWith={setSearchWith}
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
