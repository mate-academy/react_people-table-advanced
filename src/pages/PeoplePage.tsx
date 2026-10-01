import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = React.memo(function PeoplePage() {
  const [allPeople, setAllPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);

  const [searchParams] = useSearchParams();

  const normalizePeople = useCallback((data: Person[]): Person[] => {
    const people = [...data];

    const peopleByName = new Map(people.map(person => [person.name, person]));

    for (const person of people) {
      const mother =
        person.motherName !== null ? peopleByName.get(person.motherName) : null;
      const father =
        person.fatherName !== null ? peopleByName.get(person.fatherName) : null;

      if (mother !== null) {
        person.mother = mother;
      }

      if (father !== null) {
        person.father = father;
      }
    }

    return people;
  }, []);

  const filteredPeople = useMemo(() => {
    if (!allPeople) {
      return [];
    }

    const centuries = searchParams.getAll('century');
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.trim().toLowerCase();
    const sort = searchParams.get('sort');
    const order = searchParams.get('order') ? -1 : 1;

    const filtered = allPeople.filter(person => {
      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(`${Math.ceil(person.born / 100)}`);

      const matchesSex = sex === null || person.sex === sex;

      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query);

      return matchesCentury && matchesSex && matchesQuery;
    });

    if (!sort) {
      return filtered;
    }

    return filtered.sort((person1, person2) => {
      switch (sort) {
        case 'name':
          return person1.name.localeCompare(person2.name) * order;
        case 'sex':
          return person1.sex.localeCompare(person2.sex) * order;
        case 'born':
          return (person1.born - person2.born) * order;
        case 'died':
          return (person1.died - person2.died) * order;
        default:
          return 0;
      }
    });
  }, [allPeople, searchParams]);

  useEffect(() => {
    setIsRendering(true);
    getPeople()
      .then(people => {
        setAllPeople(normalizePeople(people));
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsRendering(false));
  }, [normalizePeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isRendering || (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isRendering ? (
                <Loader />
              ) : errorMessage || !allPeople ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              ) : allPeople.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
