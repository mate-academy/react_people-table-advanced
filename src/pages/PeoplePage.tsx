import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilter';

type Callback = (personA: Person, personB: Person) => number;

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasErrorInLoading, setHasErrorInLoading] = useState(false);
  const [hasErrorEmpty, setHasErrorEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (!peopleFromServer.length) {
        setHasErrorEmpty(true);
      }

      setPeople(peopleFromServer);
    } catch {
      setHasErrorInLoading(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const validateByQuery = (person: Person, queryData: string) => {
    const normalizedQuery = queryData.toLowerCase();
    const normalizedName = person.name.toLowerCase();
    const fatherName = person.fatherName?.toLowerCase() || '';
    const motherName = person.motherName?.toLowerCase() || '';

    return normalizedName.includes(normalizedQuery)
    || fatherName.includes(normalizedQuery)
    || motherName.includes(normalizedQuery);
  };

  const validateByCenturies = (person: Person, centuriesData: string[]) => {
    return centuriesData.some(
      century => +century === Math.ceil(person.born / 100),
    );
  };

  const filteredPeople = useMemo<Person[]>(() => {
    if (!people) {
      return [];
    }

    return people.filter(person => {
      if (sex) {
        if (centuries.length > 0) {
          return person.sex === sex
            && validateByQuery(person, query)
            && validateByCenturies(person, centuries);
        }

        return person.sex === sex && validateByQuery(person, query);
      }

      if (centuries.length > 0) {
        return validateByQuery(person, query)
        && validateByCenturies(person, centuries);
      }

      return validateByQuery(person, query);
    });
  }, [people, searchParams]);

  const sortPeople = (
    peopleFromServer: Person[],
    sortKey: string | null,
    order: string | null,
  ) => {
    const callback: Callback = (personA: Person, personB: Person) => {
      switch (sortKey) {
        case 'name':
        case 'sex':
          return order === 'desc'
            ? personA[sortKey].localeCompare(personB[sortKey])
            : personB[sortKey].localeCompare(personA[sortKey]);
        case 'born':
        case 'died':
          return order === 'desc'
            ? +personA[sortKey] - +personB[sortKey]
            : +personB[sortKey] - +personA[sortKey];
        default:
          return 0;
      }
    };

    return peopleFromServer.sort(callback);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasErrorInLoading && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {hasErrorEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people && !filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  searchParams={searchParams}
                  sortPeople={sortPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
