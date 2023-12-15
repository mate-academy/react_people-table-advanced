import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Person, PersonsKeys } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import { Sex } from '../../types/Sex';
import { getPeopleFilter } from '../../utils/filter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') as Sex || Sex.All;
  const sort = searchParams.get('sort') as (PersonsKeys | '') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(
    () => getPeopleFilter(people, query, centuries, sex, sort, order),
    [people, query, centuries, sex, sort, order],
  );

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">

        {isLoading ? (
          <div className="box table-container">
            <Loader />
          </div>
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
                centuries={centuries}
                query={query}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable
                  people={visiblePeople}
                  searchParams={searchParams}
                  sort={sort}
                  order={order}
                />
              </div>
            </div>
          </div>
        )}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {(people.length === 0 && !isError && !isLoading) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </>
  );
};
