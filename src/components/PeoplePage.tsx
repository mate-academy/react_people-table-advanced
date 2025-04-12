import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { CenturyFilter, SexFilter } from '../types/FiltersParam';

function getFilteredPeople(
  people: Person[],
  sex: SexFilter,
  query: string,
  century: CenturyFilter[],
) {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      if (sex === SexFilter.All) {
        return true;
      }

      return person.sex === sex;
    });
  }

  if (query) {
    const normolizedQuery = query.toLowerCase().trim();

    filteredPeople = filteredPeople.filter(person => {
      if (person.name.toLowerCase().includes(normolizedQuery)) {
        return true;
      }

      if (
        person.motherName &&
        person.motherName.toLowerCase().includes(normolizedQuery)
      ) {
        return true;
      }

      if (
        person.fatherName &&
        person.fatherName.toLowerCase().includes(normolizedQuery)
      ) {
        return true;
      }

      return false;
    });
  }

  if (century) {
    filteredPeople = filteredPeople.filter(person => {
      const personCentery = Math.ceil(person.born / 100).toString();

      if (!century.length) {
        return true;
      }

      return century.includes(personCentery as CenturyFilter);
    });
  }

  return filteredPeople;
}

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const sexFilterBy = searchParams.get('sex') || SexFilter.All;
  const query = searchParams.get('query') || '';
  const centuryFilterBy = searchParams.get('centuries')?.split('-') || [];
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = getFilteredPeople(
    people,
    sexFilterBy as SexFilter,
    query,
    centuryFilterBy as CenturyFilter[],
  );

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

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people && visiblePeople.length > 0 && (
                <PeopleTable
                  visiblePeople={visiblePeople}
                  currentPeople={people}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
