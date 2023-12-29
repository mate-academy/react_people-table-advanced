import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleLoadingError } from './PeopleLoadingError';
import { NoPeopleMessage } from './NoPeopleMessage';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { getFilteredPeople } from '../utils/helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || null;
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const filteredPeople = getFilteredPeople(people, query, sex,
    centuries, sort, order);

  useEffect(() => {
    getPeople()
      .then((result) => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading
             && (
               <PeopleFilters
                 query={query}
                 handleQueryChange={handleQueryChange}
                 centuries={centuries}
                 sex={sex}
               />
             )}
          </div>

          <div className="column">
            <div className="box table-container">

              {isLoading
                ? <Loader />
                : (isError && <PeopleLoadingError />) || (people.length > 0
                  ? (
                    <PeopleTable
                      people={filteredPeople}
                      sort={sort}
                      order={order}
                      setSearchWith={setSearchWith}
                    />
                  )
                  : <NoPeopleMessage />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
