import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Person } from '../types';

import { getPeople } from '../api';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

const sortPeople = (
  people: Person[],
  sort: string,
  order: string,
): Person[] => {
  if (!sort) {
    return people;
  }

  switch (sort) {
    case 'name':
    case 'sex':
      return [...people].sort(
        (personA, personB) =>
          (order ? -1 : 1) * personA[sort].localeCompare(personB[sort]),
      );

    case 'born':
    case 'died':

    default:
      return people;
  }
};

const filterPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: number[],
): Person[] => {
  return people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (
      query &&
      !(
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query)
      )
    ) {
      return false;
    }

    if (centuries.length) {
      const century = Math.ceil(person.born / 100);

      if (!centuries.includes(century)) {
        return false;
      }
    }

    return true;
  });
};

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();
  const selectedPerson = people.find(person => person.slug === slug);

  const sex = searchParams.get('sex') || '';
  const query = (searchParams.get('query') || '').toLowerCase();
  const centuries = searchParams.getAll('centuries').map(century => +century);

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = filterPeople(people, sex, query, centuries);
  const filteredAndSortedPeople = sortPeople(filteredPeople, sort, order);

  useEffect(() => {
    getPeople()
      .then(loadedPeople => {
        const dict = loadedPeople.reduce<{ [key: string]: Person }>(
          (prev, person) => {
            // eslint-disable-next-line no-param-reassign
            prev[person.name] = person;

            return prev;
          },
          {},
        );

        setPeople(
          loadedPeople.map(person => {
            return {
              ...person,
              father: person.fatherName ? dict[person.fatherName] : undefined,
              mother: person.motherName ? dict[person.motherName] : undefined,
            };
          }),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isContentVisible = !isLoading && !hasError;

  const hasPeople = people.length !== 0;
  const hasContent = hasPeople && filteredPeople.length !== 0;

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

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isContentVisible && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isContentVisible && !hasContent && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isContentVisible && hasContent && (
                <PeopleTable
                  people={filteredAndSortedPeople}
                  selectedPerson={selectedPerson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
