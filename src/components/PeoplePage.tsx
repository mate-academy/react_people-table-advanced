import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order') ?? 'asc';

  const visiblePeople = useMemo(() => {
    if (!people.length) {
      return [];
    }

    let result = people.slice();

    if (sex === 'm' || sex === 'f') {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries?.length > 0) {
      result = result.filter(p => {
        const c = Math.floor((p.born - 1) / 100) + 1;
        const century = String(c);

        return centuries.includes(century);
      });
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();

      result = result.filter(
        p =>
          (p.name ?? '').toLowerCase().includes(q) ||
          (p.motherName ?? '').toLowerCase().includes(q) ||
          (p.fatherName ?? '').toLowerCase().includes(q),
      );
    }

    if (sortField) {
      const dir = order === 'desc' ? -1 : 1;

      result.sort((a, b) => {
        const aValue = a[sortField as keyof Person];
        const bValue = b[sortField as keyof Person];

        const av =
          typeof aValue === 'string'
            ? aValue.toLowerCase()
            : typeof aValue === 'number'
              ? aValue
              : 0;

        const bv =
          typeof bValue === 'string'
            ? bValue.toLowerCase()
            : typeof bValue === 'number'
              ? bValue
              : 0;

        if (av === bv) {
          return 0;
        }

        return av > bv ? dir : -dir;
      });
    }

    return result;
  }, [people, query, sex, centuries, sortField, order]);

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

              {!!visiblePeople.length && (
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}

              {!visiblePeople.length && !error && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
