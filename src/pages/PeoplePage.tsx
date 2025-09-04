import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        const peopleMap: Record<string, Person> = Object.fromEntries(
          fetchedPeople.map(p => [p.name, p]),
        );

        const peopleWithParents = fetchedPeople.map(p => ({
          ...p,
          mother: p.motherName ? peopleMap[p.motherName] : undefined,
          father: p.fatherName ? peopleMap[p.fatherName] : undefined,
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const sortedPeople = useMemo(() => {
    if (!sortField) {
      return people;
    }

    const sorted = [...people].sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return 0;
    });

    if (sortOrder === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [people, sortField, sortOrder]);

  const visiblePeople = sortedPeople.filter(person => {
    const lowerQuery = query.toLowerCase();

    const matchesQuery =
      person.name.toLowerCase().includes(lowerQuery) ||
      person.motherName?.toLowerCase().includes(lowerQuery) ||
      person.fatherName?.toLowerCase().includes(lowerQuery);

    const matchesSex = sex === '' || person.sex === sex;
    const birthCentury = Math.ceil(person.born / 100);
    const matchesCentury =
      centuries.length === 0 || centuries.includes(birthCentury.toString());

    return matchesQuery && matchesSex && matchesCentury;
  });

  const handleSort = (field: keyof Person) => {
    const params = new URLSearchParams(searchParams);

    if (sortField !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (sortField === field && !sortOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && (
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
              {!loading && !error && visiblePeople.length === 0 && (
                <p data-cy="noPeopleMessage">No people found</p>
              )}
              {!loading && !error && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  highlightedSlug={slug}
                  onSort={handleSort}
                  sortField={sortField as keyof Person | undefined}
                  sortOrder={sortOrder as 'asc' | 'desc' | undefined}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
