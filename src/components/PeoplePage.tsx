import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { PageTitle } from './PageTitle';
import { getPeople } from '../api';
import { Person } from '../types';
import { filterData } from '../utils/filterHelper';

export const PeoplePage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';
  const centuriesParam = searchParams.getAll('centuries');
  const centuries = centuriesParam.length ? centuriesParam : [];

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const people = await getPeople();

        setData(people);
        setAllPeople(people);
      } catch (fetchError) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPeople = filterData(data, query, sex, sort, order, centuries);

  return (
    <>
      <PageTitle title="People Page" />

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && data.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable
                  data={filteredPeople}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  allData={allPeople}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
