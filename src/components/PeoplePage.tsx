import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types/Person';
import { getPeople } from '../api/people';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const selectedPerson = people.find(person => person.slug === slug);
  const selectedSex = searchParams.get('sex');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const normalizedQuery = query.toLowerCase();

    const matchesQuery =
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(String(Math.ceil(person.born / 100)));

    const matchesSex = selectedSex === null || person.sex === selectedSex;

    return matchesQuery && matchesCentury && matchesSex;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((personA, personB) => {
      if (sort === 'name') {
        return personA.name.localeCompare(personB.name);
      }

      if (sort === 'sex') {
        return personA.sex.localeCompare(personB.sex);
      }

      if (sort === 'born') {
        return personA.born - personB.born;
      }

      if (sort === 'died') {
        return personA.died - personB.died;
      }

      return 0;
    });

    if (order === 'desc') {
      sortedPeople.reverse();
    }
  }

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const hasNoResults =
    !isLoading && !hasError && people.length > 0 && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoResults && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && filteredPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
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
