import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

const preparePeople = (people: Person[]): Person[] => {
  const peopleByName = new Map(people.map(person => [person.name, person]));

  return people.map(person => ({
    ...person,
    mother: person.motherName ? peopleByName.get(person.motherName) : undefined,
    father: person.fatherName ? peopleByName.get(person.fatherName) : undefined,
  }));
};

const getVisiblePeople = (people: Person[], searchParams: URLSearchParams) => {
  const sex = searchParams.get('sex');
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query),
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sort === 'name') {
    visiblePeople.sort((person1, person2) =>
      person1.name.localeCompare(person2.name),
    );
  }

  if (sort === 'sex') {
    visiblePeople.sort((person1, person2) =>
      person1.sex.localeCompare(person2.sex),
    );
  }

  if (sort === 'born') {
    visiblePeople.sort((person1, person2) => person1.born - person2.born);
  }

  if (sort === 'died') {
    visiblePeople.sort((person1, person2) => person1.died - person2.died);
  }

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  return visiblePeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(loadedPeople => setPeople(preparePeople(loadedPeople)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isPeopleLoaded = !isLoading && !hasError && people.length > 0;
  const visiblePeople = getVisiblePeople(people, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isPeopleLoaded && (
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

              {isPeopleLoaded && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isPeopleLoaded && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
