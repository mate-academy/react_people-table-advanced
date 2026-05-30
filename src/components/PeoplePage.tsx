import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data: Person[]) => {
        const prepapedPeople = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(prepapedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(century.toString());
    });
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;

        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;

        case 'born':
          result = a.born - b.born;
          break;

        case 'died':
          result = a.died - b.died;
          break;
      }

      return order === 'desc' ? -result : result;
    });
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
