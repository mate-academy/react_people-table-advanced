import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { PeopleFilters } from 'components/PeopleFilters';
import { PeopleTable } from 'components/PeopleTable';
import { Loader } from 'components/Loader';
import { getPeople } from 'api';
import { Person } from 'types';
import { Sex } from 'enums/Sex';

interface IFilter {
  query: string;
  sex: Sex;
  centuries: string[];
}

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState<IFilter>({
    sex: Sex.All,
    query: '',
    centuries: [],
  });

  const deepCopyOfPeople: Person[] = useMemo(() => (
    JSON.parse(JSON.stringify(peopleFromServer))
  ), [peopleFromServer]);

  const applyFilters = useCallback((filters: IFilter): Person[] => {
    const { sex, query, centuries } = filters;

    return deepCopyOfPeople.filter((person) => {
      const {
        name, fatherName, motherName, sex: personSex, born,
      } = person;

      const isSexMatch = sex === Sex.All || personSex === sex;
      const isQueryMatch = !query
      || [name, fatherName, motherName].some((value) => (
        value?.toLowerCase().includes(query.toLowerCase())
      ));
      const isCenturyMatch = centuries.length === 0
      || centuries.some(
        (century) => (
          born <= parseInt(century, 10) * 100
          && born > (parseInt(century, 10) - 1) * 100
        ),
      );

      return isSexMatch && isQueryMatch && isCenturyMatch;
    });
  }, [deepCopyOfPeople]);

  useEffect(() => {
    setFilteredPeople(deepCopyOfPeople);
  }, [peopleFromServer]);

  useEffect(() => {
    setFilteredPeople(applyFilters(filterValue));
  }, [deepCopyOfPeople, filterValue]);

  const fetchData = async () => {
    try {
      const data = await getPeople();

      setPeopleFromServer(data);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoading(true);
  }, []);

  const handleFilterSex = (value: Sex) => {
    setFilterValue((currFilters) => ({ ...currFilters, sex: value }));
  };

  const handleSelectCentury = (value: string[]) => {
    setFilterValue((currFilter) => ({ ...currFilter, centuries: value }));
  };

  const handleQuery = (query: string) => {
    setFilterValue((currFilter) => ({ ...currFilter, query }));
  };

  const resetFilers = () => {
    setFilterValue({
      centuries: [],
      sex: Sex.All,
      query: '',
    });
  };

  if (!peopleFromServer.length && isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              handleFilterSex={handleFilterSex}
              handleQuery={handleQuery}
              handleSelectCentury={handleSelectCentury}
              resetFilters={resetFilers}
            />
          </div>

          <div className="column">
            <div className="box table-container">

              <PeopleTable
                filteredPeople={filteredPeople}
                peopleFromServer={peopleFromServer}
              />

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!peopleFromServer.length && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
