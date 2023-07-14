import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { findParrentsForEachPerson } from '../utils/FindPerson';
import { SortOptions } from '../types/SortOptions';
import { SortDirections } from '../types/SortDirections';
import { sortPeople } from '../utils/SortPeople';
import { filterPeople } from '../utils/FilterPeople';

export const PeoplePage = () => {
  const [dataPersons, setDataPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = (searchParams.get('sort') || '') as SortOptions;
  const order = (searchParams.get('order') || '') as SortDirections;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedPeople = await getPeople();

        setDataPersons(findParrentsForEachPerson(loadedPeople));
      } catch {
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(dataPersons, query, sex, centuries);
  }, [dataPersons, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {loadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {dataPersons.length > 0 && <PeopleTable people={sortedPeople} />}

              {!loadError && !isLoading && !dataPersons.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
