import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useLocation } from 'react-router-dom';

function addParents(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(peopleItem => peopleItem.name === person.motherName),
      father: people.find(peopleItem => peopleItem.name === person.fatherName),
    };
  });
}

function filterPeople(people: Person[], queryParams: URLSearchParams) {
  const query = queryParams.get('query');
  const querySex = queryParams.get('sex');
  const queryCenturies = queryParams.getAll('centuries');

  if (!queryParams.toString()) {
    return structuredClone(people);
  }

  const filteredPeople = people.filter(person => {
    let result;

    if (query) {
      const { name, fatherName, motherName } = person;

      result = [name, fatherName, motherName].some(personName => {
        return personName?.toLowerCase().includes(query.toLowerCase());
      });
      if (!result) {
        return false;
      }
    }

    result = person.sex === querySex || !querySex;
    if (!result) {
      return false;
    }

    const century = Math.ceil(person.born / 100);

    result =
      queryCenturies.includes(century.toString()) ||
      queryCenturies.length === 0;

    return result;
  });

  return filteredPeople;
}

function sortPeople(filteredPeople: Person[], queryParams: URLSearchParams) {
  const querySort = queryParams.get('sort');
  const queryDesc = queryParams.get('order');

  if (!querySort) {
    return filteredPeople;
  }

  return filteredPeople.sort((a, b) => {
    if (querySort === 'name') {
      return !queryDesc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (querySort === 'sex') {
      return !queryDesc
        ? a.sex.localeCompare(b.sex)
        : b.sex.localeCompare(a.sex);
    }

    if (querySort === 'born') {
      return !queryDesc ? a.born - b.born : b.born - a.born;
    }

    return !queryDesc ? a.died - b.died : b.died - a.died;
  });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { search } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(addParents(data));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const queryParams = new URLSearchParams(search);

    return filterPeople(people, queryParams);
  }, [people, search]);

  const sortedPeople = useMemo(() => {
    const queryParams = new URLSearchParams(search);

    return sortPeople(filteredPeople, queryParams);
  }, [filteredPeople, search]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoading && <Loader />}

              {!isLoading && (
                <>
                  {people.length === 0 && !hasError && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {sortedPeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable people={sortedPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
