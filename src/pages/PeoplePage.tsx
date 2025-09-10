import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import PeopleTable from '../components/PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { getSearchWith } from '../utils/searchHelper';

const PeoplePage: React.FC = () => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || 'asc';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setAllPeople)
      .catch(() => setFetchError('Unable to load the data'))
      .finally(() => setIsLoading(false));
  }, []);

  const updateQuery = (value: string) => {
    const nextParams = getSearchWith(searchParams, { query: value || null });

    setSearchParams(nextParams);
  };

  const filteredAndSorted = useMemo(() => {
    const filtered = allPeople.filter(person => {
      const query = currentQuery.toLowerCase();
      const matchesName = [
        person.name,
        person.motherName ?? '',
        person.fatherName ?? '',
      ].some(n => n.toLowerCase().includes(query));

      const matchesSex = !currentSex || person.sex === currentSex;
      const century = String(Math.ceil(person.born / 100));
      const matchesCentury =
        !selectedCenturies.length || selectedCenturies.includes(century);

      return matchesName && matchesSex && matchesCentury;
    });

    if (!sortField) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const key = sortField as keyof Person;
      const aVal = a[key];
      const bVal = b[key];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });
  }, [
    allPeople,
    currentQuery,
    currentSex,
    selectedCenturies,
    sortField,
    sortOrder,
  ]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !fetchError && allPeople.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={currentQuery}
                onQueryChange={updateQuery}
                sex={currentSex}
                centuries={selectedCenturies}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {fetchError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !fetchError && allPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !fetchError && allPeople.length > 0 && (
                <PeopleTable
                  people={filteredAndSorted}
                  selectedSlug={slug || ''}
                  sort={sortField}
                  order={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
