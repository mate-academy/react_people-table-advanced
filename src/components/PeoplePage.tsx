/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(century.toString());
    });
  }

  if (sortBy) {
    visiblePeople.sort((a, b) => {
      const valA = a[sortBy as keyof Person];
      const valB = b[sortBy as keyof Person];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'desc' ? valB - valA : valA - valB;
      }

      const strA = String(valA);
      const strB = String(valB);

      return sortOrder === 'desc'
        ? strB.localeCompare(strA)
        : strA.localeCompare(strB);
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !isError &&
                people.length > 0 &&
                visiblePeople.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                )}

              {!isLoading && !isError && people.length > 0 && (
                <PeopleTable people={people} visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
