import { useEffect, useState, useMemo } from 'react';
import { Person } from '../types';
import { PersonWithParents } from '../types/PersonWithParent';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuriesFilter = searchParams.getAll('centuries');
  const queryFilter = searchParams.get('query') || '';
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (sexFilter) {
      result = result.filter(p => p.sex === sexFilter);
    }

    if (centuriesFilter.length > 0) {
      result = result.filter(p => {
        const century = Math.ceil(p.born / 100).toString();

        return centuriesFilter.includes(century);
      });
    }

    if (queryFilter) {
      const normalizedQuery = queryFilter.toLowerCase().trim();

      result = result.filter(p => {
        return (
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.motherName?.toLowerCase().includes(normalizedQuery) ||
          p.fatherName?.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    return result;
  }, [people, sexFilter, centuriesFilter, queryFilter]);

  const finalPeople = useMemo(() => {
    const result = [...filteredPeople];

    if (sortField) {
      result.sort((a, b) => {
        const valA = a[sortField as keyof Person];
        const valB = b[sortField as keyof Person];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'desc'
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        }

        return sortOrder === 'desc'
          ? (valB as number) - (valA as number)
          : (valA as number) - (valB as number);
      });
    }

    return result;
  }, [filteredPeople, sortField, sortOrder]);

  const enrichedPeople: PersonWithParents[] = useMemo(() => {
    return finalPeople.map(person => ({
      ...person,
      motherPerson: people.find(p => p.name === person.motherName) || null,
      fatherPerson: people.find(p => p.name === person.fatherName) || null,
    }));
  }, [finalPeople, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && (
                <>
                  {enrichedPeople.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <PeopleTable people={enrichedPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
