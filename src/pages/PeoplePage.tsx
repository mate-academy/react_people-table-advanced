import { useEffect, useMemo, useState } from 'react';

import { PeopleFilters } from 'components/PeopleFilters';
import { PeopleTable } from 'components/PeopleTable';
import { Loader } from 'components/Loader';
import { getPeople } from 'api';
import { Person } from 'types';
import { Sex } from 'enums/Sex';
import { Filter } from 'types/Filter';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const deepCopyOfPeople: Person[] = useMemo(() => (
    JSON.parse(JSON.stringify(peopleFromServer))
  ), [peopleFromServer]);

  useEffect(() => {
    setFilteredPeople(deepCopyOfPeople);
  }, [peopleFromServer]);

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

  const handleFilter = (value: Filter | string[]) => {
    const isSex = Object.values(Sex).includes(value as Sex);
    let arrayOfPeople: Person[] = [];

    if (isSex) {
      arrayOfPeople = deepCopyOfPeople.filter((person) => {
        if (value === Sex.All) {
          return person.sex;
        }

        return person.sex === value;
      });

      setFilteredPeople(arrayOfPeople);
    }

    if (Array.isArray(value)) {
      arrayOfPeople = deepCopyOfPeople.filter(({ born }) => {
        const matchingCenturies = value.filter((val) => {
          const century = parseInt(val, 10) * 100;
          const previousCentury = century - 100;

          if (born <= century && born > previousCentury) {
            return true;
          }

          return false;
        });

        return matchingCenturies.length > 0;
      });

      setFilteredPeople(arrayOfPeople);
    }

    if (!Array.isArray(value) && !isSex) {
      setFilteredPeople(deepCopyOfPeople);
    }
  };

  const handleQuery = (query: string) => {
    let arrayOfPeople: Person[] = [];

    arrayOfPeople = deepCopyOfPeople.filter((person) => {
      const { name, fatherName, motherName } = person;
      const valuesToSearch = [name, fatherName, motherName];
      const isExists = valuesToSearch
        .some(value => (
          value && value.toLowerCase().includes(query.toLowerCase())
        ));

      if (isExists) {
        return true;
      }

      return false;
    });

    setFilteredPeople(arrayOfPeople);
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
              handleFilter={handleFilter}
              handleQuery={handleQuery}
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
