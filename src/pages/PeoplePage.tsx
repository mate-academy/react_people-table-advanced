/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { SortField } from '../types/SortField';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then(dataFromServer => {
        setPeople(dataFromServer);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  let visiblePeople = [...people];

  if (query) {
    const lowerQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        (person.fatherName || '').toLowerCase().includes(lowerQuery) ||
        (person.motherName || '').toLowerCase().includes(lowerQuery),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const personCentury = Math.floor(person.born / 100) + 1;

      return centuries.includes(String(personCentury));
    });
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      const valA = a[sort as SortField];
      const valB = b[sort as SortField];

      if (typeof valA === 'string') {
        return valA.localeCompare(valB as string);
      }

      return Number(valA) - Number(valB);
    });

    if (order === 'desc') {
      visiblePeople.reverse();
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoader && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}
              {!isLoader && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoader && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoader &&
                !error &&
                people.length > 0 &&
                visiblePeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!isLoader && !error && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
