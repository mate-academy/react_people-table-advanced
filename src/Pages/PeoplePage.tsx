// PeoplePage.tsx
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';

import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const selectedSlug = location.pathname.split('/').pop();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let filteredPeople = [...people];

  const query = searchParams.get('query')?.toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      [person.name, person.motherName, person.fatherName].some(field =>
        field?.toLowerCase().includes(query),
      ),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.floor((person.born - 1) / 100) + 1;

      return centuries.includes(String(century));
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  // Aplicar ordenação
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  if (sort) {
    filteredPeople.sort((a, b) => {
      let valueA = a[sort as keyof Person];
      let valueB = b[sort as keyof Person];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
      }

      if (typeof valueB === 'string') {
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !hasError && people.length > 0 && (
        <>
          <PeopleFilters />

          <div className="box table-container">
            <PeopleTable people={filteredPeople} selectedSlug={selectedSlug} />
          </div>
        </>
      )}
    </>
  );
};
