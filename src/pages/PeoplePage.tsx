import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

const getCenturyFromYear = (year: number): string => {
  return Math.ceil(year / 100).toString();
};

const ALL = 'null';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setErrorMessage('Unable to load people');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredPeople: Person[] = [...people];

    const query = searchParams.get('query')?.toLowerCase();

    if (query) {
      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person =>
        centuries.includes(getCenturyFromYear(person.born)),
      );
    }

    const sex = searchParams.get('sex');

    if (sex && sex !== ALL) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (sortConfig.key) {
      filteredPeople = filteredPeople.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Person];
        const bValue = b[sortConfig.key as keyof Person];

        if (aValue === null || aValue === undefined) {
          return 1;
        }

        if (bValue === null || bValue === undefined) {
          return -1;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    setSortedPeople(filteredPeople);
  }, [people, searchParams, sortConfig]);

  const handleSort = (key: keyof Person) => {
    setSortConfig(prevCondfig => {
      const isAscending =
        prevCondfig.key === key && prevCondfig.direction === 'asc';
      const newDirection = isAscending ? 'desc' : 'asc';

      return {
        key,
        direction: newDirection,
      };
    });

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      newParams.set('sort', key);
      newParams.set('order', sortConfig.direction ? 'desc' : 'asc');

      return newParams.toString();
    });
  };

  const noDataAvailable = !isLoading && !errorMessage && people.length === 0;
  const noFilterDataAvailable =
    !isLoading &&
    !errorMessage &&
    people.length > 0 &&
    sortedPeople.length === 0;
  const dataAvailable = !isLoading && !errorMessage && people.length > 0;

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
              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {noDataAvailable && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noFilterDataAvailable && (
                <p>There are no people matching the current search criteria</p>
              )}

              {dataAvailable && (
                <PeopleTable
                  people={people}
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  sortedPeople={sortedPeople}
                  noFilterDataAvailable={noFilterDataAvailable}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
