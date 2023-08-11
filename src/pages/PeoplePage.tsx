import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';
import { filteringPeople } from '../utils/filteringPeople';
import { sortingPeople } from '../utils/sortingPeople';

export enum SearchType {
  QUERY = 'query',
  SEX = 'sex',
  CENTURIES = 'centuries',
  SORT = 'sort',
  ORDER = 'order',
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SearchType.QUERY) || '';
  const sex = searchParams.get(SearchType.SEX) || '';
  const centuries = searchParams.getAll(SearchType.CENTURIES) || [];

  const sortBy = searchParams.get(SearchType.SORT);
  const order = searchParams.get(SearchType.ORDER);

  const fiteredPeople = filteringPeople(people, query, centuries, sex);
  const preparedPeople = sortingPeople(fiteredPeople, sortBy, order);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const handleSexChange = (gender: string) => {
    setSearchParams(
      getSearchWith(searchParams, { gender }),
    );
  };

  const parents = (data: Person[]) => {
    const preparedData = data.map((person) => {
      return {
        ...person,
        mother: data.find(m => m.name === person.motherName),
        father: data.find(f => f.name === person.fatherName),
      };
    });

    setPeople(preparedData);
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(parents)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                centuries={centuries}
                sex={sex}
                handleQueryChange={handleQueryChange}
                handleSexChange={handleSexChange}

              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!fiteredPeople.length && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable
                people={preparedPeople}
                loading={loading}
                isError={isError}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
