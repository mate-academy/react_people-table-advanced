import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

function preparePeople(peopleFromServer: Person[]) {
  return peopleFromServer.map(person => {
    const mother = peopleFromServer.find(currentPerson => {
      return currentPerson.name === person.motherName;
    });

    const father = peopleFromServer.find(currentPerson => {
      return currentPerson.name === person.fatherName;
    });

    return {
      ...person,
      mother,
      father,
    };
  });
}

function getCentury(year: number) {
  return Math.ceil(year / 100);
}

function getVisiblePeople(
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
) {
  const normalizedQuery = query.trim().toLowerCase();

  return people.filter(person => {
    const matchesQuery =
      normalizedQuery === '' ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesSex = sex === null || person.sex === sex;
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(getCentury(person.born)));

    return matchesQuery && matchesSex && matchesCentury;
  });
}

function getSortedPeople(
  people: Person[],
  sort: string | null,
  order: string | null,
) {
  const sortedPeople = [...people];

  if (!sort) {
    return sortedPeople;
  }

  sortedPeople.sort((firstPerson, secondPerson) => {
    switch (sort) {
      case 'name':
        return firstPerson.name.localeCompare(secondPerson.name);

      case 'sex':
        return firstPerson.sex.localeCompare(secondPerson.sex);

      case 'born':
        return firstPerson.born - secondPerson.born;

      case 'died':
        return firstPerson.died - secondPerson.died;

      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
}

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(peopleFromServer => {
        setPeople(preparePeople(peopleFromServer));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getVisiblePeople(people, query, sex, centuries);
  const sortedPeople = getSortedPeople(visiblePeople, sort, order);
  const hasPeople = people.length > 0;
  const hasVisiblePeople = sortedPeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && hasPeople && !hasVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && hasVisiblePeople && (
                <PeopleTable
                  people={sortedPeople}
                  selectedSlug={slug}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
