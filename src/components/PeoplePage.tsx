import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setErrorMessage(false);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let preparedPeople = [...people];

  if (query) {
    preparedPeople = preparedPeople.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        (p.motherName && p.motherName.toLowerCase().includes(query)) ||
        (p.fatherName && p.fatherName.toLowerCase().includes(query)),
    );
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(p => p.sex === sex);
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter(p => {
      const century = Math.ceil(p.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    preparedPeople.sort((a, b) => {
      let valA = a[sort as keyof Person] ?? '';
      let valB = b[sort as keyof Person] ?? '';

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) {
        return order === 'desc' ? 1 : -1;
      }

      if (valA > valB) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <PeopleFilters />

      {loading && <Loader />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Failed to load people
        </p>
      )}

      {!loading && !errorMessage && (
        <>
          {preparedPeople.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={preparedPeople} />
          )}
        </>
      )}
    </div>
  );
};
