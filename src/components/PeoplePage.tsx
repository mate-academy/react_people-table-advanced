import React, {
  memo, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getVisiblePeople } from '../utils/getVisiblePeople';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const century = searchParams.getAll('century');

  const setLoadedPeople = async () => {
    setIsLoading(true);

    try {
      setIsLoading(true);
      const loadPeople = await getPeople();

      const peopleWithParents = loadPeople.map(person => {
        const father = loadPeople.find(f => f.name === person.fatherName);
        const mother = loadPeople.find(m => m.name === person.motherName);

        return (
          {
            ...person,
            father,
            mother,
          }
        );
      });

      setPeople(peopleWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setLoadedPeople();
  }, []);

  const filteredPeople = useMemo(() => getVisiblePeople({
    people,
    query,
    sex,
    century,
    sort,
    order,
  }), [
    people,
    query,
    sex,
    sort,
    century,
    order,
  ]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
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

              {filteredPeople.length > 0 && !isLoading && (
                <PeopleTable
                  visiblePeople={filteredPeople}
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
});
