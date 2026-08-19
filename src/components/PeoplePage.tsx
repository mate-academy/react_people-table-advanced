import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from './Loader/Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase().trim();
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (query) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.motherName?.toLowerCase().includes(query) ||
          p.fatherName?.toLowerCase().includes(query),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(p => {
        const century = Math.ceil(p.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (sort) {
      result.sort((a, b) => {
        const valA = a[sort as keyof Person] ?? '';
        const valB = b[sort as keyof Person] ?? '';

        if (typeof valA === 'number' && typeof valB === 'number') {
          return order === 'desc' ? valB - valA : valA - valB;
        }

        return order === 'desc'
          ? String(valB).localeCompare(String(valA))
          : String(valA).localeCompare(String(valB));
      });
    }

    return result;
  }, [people, searchParams]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !isError && (
        <div className="columns">
          <div className="column">
            {filteredPeople.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={filteredPeople} selectedSlug={slug} />
            )}
          </div>

          <div className="column is-4-desktop is-5-tablet">
            <PeopleFilters />
          </div>
        </div>
      )}
    </div>
  );
};
