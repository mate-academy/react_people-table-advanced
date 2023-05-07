import { ChangeEventHandler, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { sortPeople } from '../utils/sortPeople';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = filterPeople(people, query, sex, centuries);

  const sortedPeople = sortPeople(filteredPeople, sort, order);

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  useEffect(() => {
    getPeople()
      .then((fetchedPeople) => {
        const populatedPeopleWithParents = fetchedPeople.map((person) => {
          const mother = fetchedPeople.find(
            (motherPerson) => motherPerson.name === person.motherName,
          );
          const father = fetchedPeople.find(
            (fatherPerson) => fatherPerson.name === person.fatherName,
          );

          return { ...person, mother, father };
        });

        setPeople(populatedPeopleWithParents);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
                centuries={centuries}
                query={query}
                onQueryChange={handleQueryChange}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length > 0 && (
                <PeopleTable people={sortedPeople} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
