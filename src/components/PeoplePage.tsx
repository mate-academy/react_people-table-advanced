import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(
          data.map(person => ({
            ...person,
            mother: data.find(p => p.name === person.motherName),
            father: data.find(p => p.name === person.fatherName),
          })),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hasPeople = !isLoading && !hasError && people.length > 0;
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').toLocaleLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    const matchesQuery = [
      person.name,
      person.motherName,
      person.fatherName,
    ].some(value => value?.toLowerCase().includes(query));

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesCentury;
  });

  const sortedPeople = [...visiblePeople];

  if (sort === 'name' || sort === 'sex') {
    sortedPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
  }

  if (sort === 'born' || sort === 'died') {
    sortedPeople.sort((a, b) => a[sort] - b[sort]);
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeople && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && visiblePeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
