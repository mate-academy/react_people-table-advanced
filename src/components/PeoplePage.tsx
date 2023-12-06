import { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { filterPeople } from '../utils/FilterPeople';
import { Filters } from '../types/Filters';

enum ErrorType {
  Type1 = 'type1',
  Type2 = 'type2',
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataIsValid, setDataIsValid] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({} as Filters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();

        if (!data || data.length === 0) {
          setErrorType(ErrorType.Type1);
          setDataIsValid(false);
        } else {
          setPeople(data);
          setDataIsValid(true);
        }
      } catch (error) {
        setErrorType(ErrorType.Type2);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = useCallback(() => {
    const filtered = filterPeople(people, filters);

    setFilteredPeople(filtered);
  }, [people, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="column">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader /> }

          {errorType === 'type1' && (
            <p data-cy="noPeopleMessage" className="has-text-danger">
              It seems there are no people on the server.
            </p>
          )}

          {errorType === 'type2' && (
            <p data-cy="peopleLoadingError">
              Something went wrong while fetching people data.
            </p>
          )}

          {dataIsValid && (
            <div className="block">
              <div className="columns is-desktop is-flex-direction-row-reverse">
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters
                    handleFilterChange={handleFilterChange}
                  />
                </div>

                <div className="column">
                  {dataIsValid && <PeopleTable people={filteredPeople} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
