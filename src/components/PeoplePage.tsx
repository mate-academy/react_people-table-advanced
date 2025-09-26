import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type Person = {
  slug: string;
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  motherName?: string;
  fatherName?: string;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();

  // --- Params from URL ---
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order'); // "desc" | null

  // --- Load people ---
  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch('/people.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error loading');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setPeople(data);
          setError(false);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // --- Filtering + Sorting ---
  const visiblePeople = useMemo(() => {
    let result = [...people];

    // Filter by query
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          ((p.motherName || '').toLowerCase().includes(q)) ||
          ((p.fatherName || '').toLowerCase().includes(q))
      );
    }

    // Filter by centuries
    if (centuries.length > 0) {
      result = result.filter(p => {
        if (typeof p.born !== 'number') return false;
        const bornCentury = Math.ceil(p.born / 100);
        return centuries.includes(String(bornCentury));
      });
    }

    // Sorting
    if (sortField) {
      result.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (sortField === 'born' || sortField === 'died') {
          // Stable numeric sorting with missing value handling
          const numA = typeof valA === 'number' ? valA : Number.POSITIVE_INFINITY;
          const numB = typeof valB === 'number' ? valB : Number.POSITIVE_INFINITY;
          return sortOrder === 'desc' ? numB - numA : numA - numB;
        }

        // Case-insensitive string sorting for name and sex
        const strA = String(valA || '').toLowerCase();
        const strB = String(valB || '').toLowerCase();

        if (strA < strB) return sortOrder === 'desc' ? 1 : -1;
        if (strA > strB) return sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    }

    return result;
  }, [people, query, centuries, sortField, sortOrder]);

  // --- Sorting handler ---
  const handleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sortField !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!sortOrder) {
      newParams.set('sort', field);
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  // --- Select person (keep filters in URL) ---
  const handleSelectPerson = (personSlug: string) => {
    navigate(`/people/${personSlug}${location.search}`);
  };

  const showFilters = !loading && !error;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {/* Filters only when people are successfully loaded */}
          {showFilters && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                  onSelectPerson={handleSelectPerson}
                  selectedSlug={slug}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
