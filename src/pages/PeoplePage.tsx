import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  // const sort = searchParams.get('sort') || '';
  // const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const preparePeople = (
    curQuery,
    curSex,
    curCenturies,
    // curSort,
    // curOrder
  ) => {
    let newPeople = [...people];

    if (curQuery) {
      const normalizedQuery = curQuery.toLocaleLowerCase();

      newPeople = newPeople.filter(person => {
        return (
          person.name.toLocaleLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLocaleLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLocaleLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (curSex) {
      newPeople = newPeople.filter(person => {
        return person.sex === curSex;
      });
    }

    if (curCenturies.length > 0) {
      newPeople = newPeople.filter(person => {
        return curCenturies.includes(String(Math.floor(person.born / 100)));
      });
    }

    return newPeople;
  };

  const preparedPeople = preparePeople(query, sex, centuries);
  // curSort,
  // curOrder

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && people.length > 0 && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// There are no people matching the current search criteria
