/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import * as peopleService from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const fields = [person.name, person.motherName, person.fatherName];

    const matchesQuery = fields.some(field =>
      (field ?? '').toLowerCase().includes(query.toLowerCase()),
    );

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    const matchesSex = sex === '' || sex.includes(person.sex);

    return matchesQuery && matchesCentury && matchesSex;
  });

  switch (sort) {
    case 'name':
    case 'sex':
      filteredPeople.sort((a, b) =>
        order === null
          ? a[sort].localeCompare(b[sort])
          : b[sort].localeCompare(a[sort]),
      );

      break;
    case 'born':
    case 'died':
      filteredPeople.sort((a, b) =>
        order === null ? a[sort] - b[sort] : b[sort] - a[sort],
      );

      break;
  }

  function getPeople() {
    setIsLoading(true);

    peopleService
      .getPeople()
      .then(peopleAPI => {
        setPeople(peopleAPI);
        setErrorMessage('');
      })
      .catch(() => {
        setPeople([]);
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(getPeople, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !errorMessage && !!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!isLoading && !errorMessage && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !errorMessage &&
                !!people.length &&
                !filteredPeople.length && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!isLoading && !errorMessage && !!filteredPeople.length && (
                <PeopleTable filteredPeople={filteredPeople} people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
