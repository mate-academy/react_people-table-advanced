import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') || '';
  const queryFilter = searchParams.get('query') || '';
  const centuriesFilter = searchParams.getAll('centuries') || [];

  const fetchPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const newPeople = await getPeople();

      setPeople(newPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  const peopleFilteredBySex = useMemo(() => (
    sexFilter
      ? people.filter(({ sex }) => sex === sexFilter)
      : people
  ), [sexFilter, people]);

  const peopleFilteredByQuery = useMemo(() => {
    const normalizedFilter = queryFilter.trim().toLowerCase();

    return queryFilter
      ? peopleFilteredBySex.filter(({ name, fatherName, motherName }) => {
        const father = fatherName || '';
        const mother = motherName || '';

        return (
          name.toLowerCase().includes(normalizedFilter)
          || father.toLowerCase().includes(normalizedFilter)
          || mother.toLowerCase().includes(normalizedFilter)
        );
      })
      : peopleFilteredBySex;
  }, [queryFilter, peopleFilteredBySex]);

  const peopleFilteredByCenturies = useMemo(() => (
    centuriesFilter.length !== 0
      ? peopleFilteredByQuery.filter(({ born }) => {
        const century = Math.floor(born / 100) + 1;

        return centuriesFilter.includes(century.toString());
      })
      : peopleFilteredByQuery
  ), [centuriesFilter, peopleFilteredByQuery]);

  const isFiltersVisible = people.length !== 0 && !isError && !isLoading;
  const isFilteredTableEmpty = (
    peopleFilteredByCenturies.length === 0 && isFiltersVisible
  );
  const isTableVisible = (
    peopleFilteredByCenturies.length !== 0 && isFiltersVisible
  );
  const isTableEmpty = people.length === 0 && !isError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {
            isFiltersVisible && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )
          }

          <div className="column">
            <div className="box table-container">
              {
                isLoading && <Loader />
              }

              {
                isError && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )
              }

              {
                isTableEmpty && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
              }

              {
                isFilteredTableEmpty && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
              }

              {
                isTableVisible && (
                  <PeopleTable people={peopleFilteredByCenturies} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
