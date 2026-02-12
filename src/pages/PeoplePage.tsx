/* eslint-disable @typescript-eslint/indent */
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';
import type { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await getPeople();

        setPeople(data ?? []);
      } catch {
        setError(true);
        setPeople(null);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filteredPeople = useMemo(() => {
    if (!people) {
      return [];
    }

    let result = [...people];

    const query = searchParams.get('query')?.toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');

    if (query) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          (p.motherName || '').toLowerCase().includes(query) ||
          (p.fatherName || '').toLowerCase().includes(query),
      );
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length) {
      result = result.filter(p => {
        if (!p.born) {
          return false;
        }

        const century = Math.ceil(Number(p.born) / 100).toString();

        return centuries.includes(century);
      });
    }

    return result;
  }, [people, searchParams]);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="columns is-desktop is-flex-direction-row-reverse">
        {!loading && !error && people?.length ? (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        ) : null}

        <div className="column">
          <div className="box table-container">
            {loading && <Loader />}

            {!loading && error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!loading && !error && people?.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading &&
            !error &&
            filteredPeople.length === 0 &&
            people?.length ? (
              <p>There are no people matching the current search criteria</p>
            ) : null}

            {!loading && !error && filteredPeople.length > 0 && (
              <PeopleTable people={filteredPeople} selectedSlug={slug} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
