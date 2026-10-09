import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const normalizedQuery = query.trim().toLowerCase();
      const nameMatch = person.name.toLowerCase().includes(normalizedQuery);
      const motherMatch = person.motherName
        ?.toLowerCase()
        .includes(normalizedQuery);
      const fatherMatch = person.fatherName
        ?.toLowerCase()
        .includes(normalizedQuery);

      if (!nameMatch && !motherMatch && !fatherMatch) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const personCentury = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(personCentury)) {
        return false;
      }
    }

    return true;
  });

  const visiblePeople = [...filteredPeople];

  if (sort) {
    visiblePeople.sort((a, b) => {
      const aValue = a[sort as keyof Person];
      const bValue = b[sort as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue);

        return order === 'desc' ? -result : result;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const result = aValue - bValue;

        return order === 'desc' ? -result : result;
      }

      return 0;
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-clickable-rows">
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>

          {!isLoading && !errorMessage && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
