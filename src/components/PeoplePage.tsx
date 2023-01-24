import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [copyPeople, setCopyPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const location = useLocation();

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
    const visiblesPeople = copyPeople?.filter(person => {
      switch (true) {
        case sex.length > 0:
          return person.sex === sex;

        case query.length > 0:
          return person.name.includes(query)
            || person.fatherName?.includes(query)
            || person.motherName?.includes(query);

        case centuries.length > 0:
          return centuries.includes((Math.ceil(person.born / 100)).toString());

        default:
          return person;
      }
    });

    visiblesPeople?.sort((p1, p2) => {
      switch (sort) {
        case 'name':
          return p1.name.localeCompare(p2.name);

        case 'sex':
          return p1.sex.localeCompare(p2.sex);

        case 'born':
          return p1.born - p2.born;

        case 'died':
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
          {people && (
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

              {(people?.length === 0 && location.search.length !== 0) && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {(people?.length === 0 && location.search.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(people && people.length !== 0) && (
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
