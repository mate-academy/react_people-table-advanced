import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetch = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const [urlParams] = useSearchParams();

  const query = urlParams.get('query');
  const centuries = urlParams.getAll('centuries');
  const sortAscParameter = urlParams.get('sort');
  const sortDescParameter = urlParams.get('order');

  const compareQueryMatch = (names: (string | null)[]) => {
    if (query) {
      return (
        names.some(name => {
          if (name) {
            return name.toLowerCase().includes(query.toLowerCase());
          }

          return false;
        })
      );
    }

    return false;
  };

  const filteredPeople = people.filter(person => {
    const { name, motherName, fatherName } = person;
    const personCentury = (+person.born.toString().slice(0, 2) + 1).toString();

    let isQueryMatch;
    let isCenturyMatch;

    if (!query || compareQueryMatch([name, motherName, fatherName])) {
      isQueryMatch = true;
    }

    if (!centuries.length || centuries.includes(personCentury)) {
      isCenturyMatch = true;
    }

    const matchAll = isQueryMatch && isCenturyMatch;

    switch (urlParams.get('sex')) {
      case 'm': return (person.sex === 'm' && matchAll);
      case 'f': return (person.sex === 'f' && matchAll);

      default: return (person && matchAll);
    }
  });

  const sortedPeople = filteredPeople.sort((personA, personB) => {
    type PersonFilter = Pick<Person, 'name' | 'sex' | 'born' | 'died'>;

    const parameterA = personA[sortAscParameter as keyof PersonFilter];
    const parameterB = personB[sortAscParameter as keyof PersonFilter];

    const dataTypeString = (
      typeof parameterA === 'string' && typeof parameterB === 'string'
    );

    const dataTypeNumber = (
      typeof parameterA === 'number' && typeof parameterB === 'number'
    );

    if (sortDescParameter && dataTypeString) {
      return parameterB.localeCompare(parameterA);
    }

    if (sortDescParameter && dataTypeNumber) {
      return parameterB - parameterA;
    }

    if (sortAscParameter && dataTypeString) {
      return parameterA.localeCompare(parameterB);
    }

    if (sortAscParameter && dataTypeNumber) {
      return parameterA - parameterB;
    }

    return 1;
  });

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {(!isLoading && !error && !people.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!isLoading && error) && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {(!isLoading && sortedPeople.length > 0) && (
                <PeopleTable people={sortedPeople} />
              )}

              {(people.length > 0 && !filteredPeople.length) && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
