import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');
  const currentSex = searchParams.get('sex');
  const queryParam = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const sortedPeople = [...people];

  if (sortField) {
    sortedPeople.sort((a, b) => {
      const aVal = a[sortField as keyof Person];
      const bVal = b[sortField as keyof Person];

      if (aVal == null || bVal == null) {
        return 0;
      }

      if (aVal > bVal) {
        return order === 'desc' ? -1 : 1;
      }

      if (aVal < bVal) {
        return order === 'desc' ? 1 : -1;
      }

      return 0;
    });
  }

  const filteredPeople = sortedPeople.filter(person => {
    const matchesQuery = queryParam
      ? person.name.toLowerCase().includes(queryParam.toLowerCase())
      : true;

    const matchesSex = currentSex ? person.sex === currentSex : true;

    const bornCentury = Math.floor(person.born / 100) + 1;
    const matchesCentury = selectedCenturies.length
      ? selectedCenturies.includes(String(bornCentury))
      : true;

    return matchesQuery && matchesSex && matchesCentury;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && !sortedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && !!filteredPeople.length && (
                <PeopleTable people={filteredPeople} slug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
