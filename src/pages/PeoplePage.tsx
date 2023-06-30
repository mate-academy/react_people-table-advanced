import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { filterPeople } from '../utils/filterPeople';
import { sortPeople } from '../utils/sortPeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const { selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    const getPeopleList = async () => {
      setIsLoading(true);
      try {
        const dataPeopleList = await getPeople();

        if (dataPeopleList) {
          setPeopleList(dataPeopleList);
        }
      } catch {
        setIsLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleList();
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(peopleList, query, centuries, sex);
  }, [peopleList, query, centuries, sex]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, order, sort);
  }, [sort, order, filteredPeople]);

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
              {isLoading && <Loader />}

              {isLoadingError
              && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {!peopleList.length && !isLoadingError
              && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!sortedPeople.length && !isLoadingError && !isLoading) && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable
                peopleList={sortedPeople}
                selectedSlug={selectedSlug}
                sort={sort}
                order={order}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
