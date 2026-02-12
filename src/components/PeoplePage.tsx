import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');

    return people.filter(person => {
      const matchesSex = !sex || person.sex === sex;

      const personCentury = Math.ceil(person.born / 100).toString();
      const matchesCentury =
        centuries.length === 0 || centuries.includes(personCentury);

      const matchesQuery =
        !query ||
        [person.name, person.motherName, person.fatherName].some(name =>
          name?.toLowerCase().includes(query),
        );

      return matchesSex && matchesCentury && matchesQuery;
    });
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    const sortField = searchParams.get('sort') as keyof Person | null;
    const order = searchParams.get('order');
    const result = [...filteredPeople];

    if (sortField) {
      result.sort((a, b) => {
        const valA = a[sortField] ?? '';
        const valB = b[sortField] ?? '';

        const comparison =
          typeof valA === 'string'
            ? (valA as string).localeCompare(valB as string)
            : (valA as number) - (valB as number);

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [filteredPeople, searchParams]);

  const hasNoPeople = !loading && !error && people.length === 0;
  const hasNoResults =
    !loading && !error && people.length > 0 && sortedPeople.length === 0;
  const showTable = !loading && !error && sortedPeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoResults && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
