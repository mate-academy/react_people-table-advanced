import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';
import { SortType } from '../types/SortType';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [copyPeople, setCopyPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyPeople, setIsEmptyPeople] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const location = useLocation();

  const visiblesPeople = useMemo(() => {
    return copyPeople?.filter(person => {
      const sexCondition = person.sex === sex;
      const queryCondition = person.name.includes(query)
     || person.fatherName?.includes(query)
     || person.motherName?.includes(query);
      const centuriesCondition
      = centuries.includes((Math.ceil(person.born / 100)).toString());

      switch (true) {
        case sex.length > 0 && query.length > 0 && centuries.length > 0:
          return sexCondition && queryCondition && centuriesCondition;

        case sex.length > 0 && query.length > 0:
          return sexCondition && queryCondition;

        case sex.length > 0 && centuries.length > 0:
          return sexCondition && centuriesCondition;

        case query.length > 0 && centuries.length > 0:
          return queryCondition && centuriesCondition;

        case sex.length > 0:
          return sexCondition;

        case query.length > 0:
          return queryCondition;

        case centuries.length > 0:
          return centuriesCondition;

        default:
          return person;
      }
    });
  }, [searchParams]);

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
      setCopyPeople(loadedPeople);
      if (!loadedPeople.length) {
        setIsEmptyPeople(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    visiblesPeople.sort((p1, p2) => {
      switch (sort) {
        case SortType.name:
          return p1.name.localeCompare(p2.name);

        case SortType.sex:
          return p1.sex.localeCompare(p2.sex);

        case SortType.born:
          return p1.born - p2.born;

        case SortType.died:
          return p1.died - p2.died;

        default:
          return 0;
      }
    });

    if (order) {
      visiblesPeople?.reverse();
    }

    setPeople(visiblesPeople as Person[]);
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                onQueryChange={onQueryChange}
                sex={sex}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {(!people.length && location.search.length !== 0) && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isEmptyPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length !== 0 && (
                <PeopleTable
                  people={people}
                  sort={sort}
                  order={order}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
