import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

type Filter = {
  query: string | null;
  sex: string | null;
  centuries: number[];
  sort: string | null;
  order: string | null;
};

function getParent(name: string | null, people: Person[]): Person | undefined {
  return people.find(p => p.name === name);
}

const getFilteredPeople = (
  people: Person[],
  { query, sex, centuries, sort, order }: Filter,
) => {
  const filteredPeople = [...people].filter(person => {
    if (sex && sex !== person.sex) {
      return false;
    }

    if (
      query &&
      !person.name.toLowerCase().includes(query) &&
      !person.motherName?.toLowerCase().includes(query) &&
      !person.fatherName?.toLowerCase().includes(query)
    ) {
      return false;
    }

    if (!!centuries.length) {
      return centuries.some(century => {
        const startYear = (century - 1) * 100 + 1;
        const endYear = century * 100;

        return person.born > startYear && person.born < endYear;
      });
    }

    return true;
  });

  if (sort) {
    filteredPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);

        case 'born':
        case 'died':
          return a[sort] - b[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasWarning, setHasWarning] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();
  const filter: Filter = {
    query: searchParams.get('query')?.toLowerCase() || null,
    sex: searchParams.get('sex'),
    centuries: searchParams.getAll('centuries').map(century => +century),
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
  };

  const filteredPeople = getFilteredPeople(people, filter);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setHasWarning(false);

    getPeople()
      .then(peopleFromServer => {
        if (!!peopleFromServer.length) {
          setPeople(
            peopleFromServer.map(person => {
              const mother = getParent(person.motherName, peopleFromServer);
              const father = getParent(person.fatherName, peopleFromServer);

              return {
                ...person,
                mother,
                father,
              };
            }),
          );
        } else {
          setHasWarning(true);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && !hasWarning && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && hasWarning && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
