import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

function sortPeople(
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
) {
  let updatedPeople = [...people];

  updatedPeople.sort((personA: Person, personB: Person) => {
    if (sort === 'name' || sort === 'sex') {
      return order === 'desc'
        ? personB[sort].localeCompare(personA[sort])
        : personA[sort].localeCompare(personB[sort]);
    }

    if (sort === 'born' || sort === 'died') {
      return order === 'desc'
        ? personB[sort] - personA[sort]
        : personA[sort] - personB[sort];
    }

    return 0;
  });

  if (sex === 'm' || sex === 'f') {
    updatedPeople = updatedPeople.filter((person) => person.sex === sex);
  }

  if (query) {
    updatedPeople = updatedPeople.filter(({ name, fatherName, motherName }) => [
      name, fatherName, motherName].some(field => field
        && field.toLowerCase().includes(query.toLowerCase())));
  }

  if (centuries.length > 0) {
    updatedPeople = updatedPeople.filter(
      person => centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  return updatedPeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortedPeople, setSortedPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong', error);
        setIsError(true);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setSortedPeople(
      sortPeople(people, query, sex, centuries, sort, order),
    );
  }, [people, searchParams]);

  const availableCenturies = people
    .map(person => Math.ceil(person.born / 100))
    .filter((year, index, arr) => arr.indexOf(year) === index)
    .sort((a, b) => a - b);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loader />
      );
    }

    if (!isLoading && isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!isLoading && people.length === 0) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return (
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters
            availableCenturies={availableCenturies}
          />
        </div>

        <div className="column">
          <div className="box table-container">
            {sortedPeople.length > 0 ? (
              <PeopleTable
                sortedPeople={sortedPeople}
                people={people}
              />
            ) : (
              <p>There are no people matching the current search criteria</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {renderContent()}
      </div>
    </>
  );
};
