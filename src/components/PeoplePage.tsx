import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const visiblePeople = people.filter(person => {
    const normalizedName = person.name.toLowerCase();
    const normalizedMother = person.motherName?.toLowerCase() || '';
    const normalizedFather = person.fatherName?.toLowerCase() || '';

    const matchesQuery =
      normalizedName.includes(query) ||
      normalizedMother.includes(query) ||
      normalizedFather.includes(query);

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    const matchesSex = sex === '' || person.sex === sex;

    return matchesQuery && matchesCentury && matchesSex;
  });

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const showNoMatchingPeople =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
          </div>

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

              {showNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
