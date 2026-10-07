import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { NameFilter } from '../components/NameFilter';
import { CenturyFilter } from '../components/CenturyFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Применяем фильтры и сортировку
  const visiblePeople = useMemo(() => {
    let result = [...people];

    // 1. Фильтрация по имени
    if (query) {
      result = result.filter(p => {
        return (
          p.name.toLowerCase().includes(query) ||
          (p.motherName && p.motherName.toLowerCase().includes(query)) ||
          (p.fatherName && p.fatherName.toLowerCase().includes(query))
        );
      });
    }

    // 2. Фильтрация по веку
    if (centuries.length > 0) {
      result = result.filter(p => {
        const century = String(Math.ceil(p.born / 100));

        return centuries.includes(century);
      });
    }

    // 3. Сортировка
    if (sort) {
      result.sort((a, b) => {
        const valA = a[sort as keyof Person];
        const valB = b[sort as keyof Person];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return order === 'desc'
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
          return order === 'desc' ? valB - valA : valA - valB;
        }

        return 0;
      });
    }

    return result;
  }, [people, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        {/* Сайдар с фильтрами появляется только если данные загружены */}
        {!loading && !error && (
          <div className="column is-one-third">
            <div className="box">
              <NameFilter />
              <CenturyFilter people={people} />
            </div>
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

            {!loading && !error && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && !error && people.length > 0 && (
              <>
                {visiblePeople.length === 0 ? (
                  <p>No matches found</p>
                ) : (
                  <PeopleTable people={visiblePeople} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
