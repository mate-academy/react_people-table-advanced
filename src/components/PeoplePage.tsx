/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';

  let visiblePeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        (person.motherName || '').toLowerCase().includes(normalizedQuery) ||
        (person.fatherName || '').toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (sort === 'name') {
    visiblePeople.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  if (sort === 'sex') {
    visiblePeople.sort((a, b) => {
      return a.sex.localeCompare(b.sex);
    });
  }

  if (sort === 'born') {
    visiblePeople.sort((a, b) => {
      return a.born - b.born;
    });
  }

  if (sort === 'died') {
    visiblePeople.sort((a, b) => {
      return a.died - b.died;
    });
  }

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    getPeople()
      .then(data => {
        const preparedPeople = data.map(person => ({
          ...person,
          mother: data.find(onePerson => onePerson.name === person.motherName),
          father: data.find(onePerson => onePerson.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length !== 0 && !hasError && !isLoading && (
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}

              {!isLoading &&
                !hasError &&
                people.length > 0 &&
                visiblePeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
