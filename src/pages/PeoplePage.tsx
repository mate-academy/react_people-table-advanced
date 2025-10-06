import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

type Error =
  | 'Something went wrong'
  | 'There are no people on the server'
  | 'none';

export type Sex = 'f' | 'm' | 'all';
export type SortField = 'name' | 'sex' | 'born' | 'died' | null;
export type SortOrder = 'asc' | 'desc';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>('none');

  const [selectedCenturies, setSelectedCenturies] = useState<number[]>([]);
  const [sortBySex, setSortBySex] = useState<Sex>('all');
  const [sortByQuery, setSortByQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError('none');

    getPeople()
      .then(fetchedPeople => {
        if (!fetchedPeople.length) {
          setError('There are no people on the server');
        } else {
          setPeople(fetchedPeople);
          setVisiblePeople(fetchedPeople);
        }
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const sexParam = (searchParams.get('sex') as Sex) || 'all';
    const queryParam = searchParams.get('query') || '';
    const centuriesParam = searchParams.getAll('centuries').map(Number);
    const sortParam = (searchParams.get('sort') as SortField) || null;
    const orderParam = (searchParams.get('order') as SortOrder) || 'asc';

    setSortBySex(sexParam);
    setSortByQuery(queryParam);
    setSelectedCenturies(centuriesParam);
    setSortField(sortParam);
    setSortOrder(orderParam);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (sortBySex !== 'all') {
      params.set('sex', sortBySex);
    }

    if (sortByQuery.trim()) {
      params.set('query', sortByQuery.trim());
    }

    if (selectedCenturies.length > 0) {
      selectedCenturies.forEach(c => params.append('centuries', String(c)));
    }

    if (sortField) {
      params.set('sort', sortField);
      if (sortOrder === 'desc') {
        params.set('order', 'desc');
      }
    }

    setSearchParams(params);
  }, [
    sortBySex,
    sortByQuery,
    selectedCenturies,
    sortField,
    sortOrder,
    setSearchParams,
  ]);

  useEffect(() => {
    let filtered = [...people];

    if (sortBySex !== 'all') {
      filtered = filtered.filter(p => p.sex === sortBySex);
    }

    if (selectedCenturies.length > 0) {
      filtered = filtered.filter(p => {
        const birthCentury = Math.ceil(p.born / 100);

        return selectedCenturies.includes(birthCentury);
      });
    }

    if (sortByQuery.trim()) {
      const q = sortByQuery.trim().toLowerCase();

      filtered = filtered.filter(p =>
        [p.name, p.motherName, p.fatherName]
          .filter(Boolean)
          .some(field => field!.toLowerCase().includes(q)),
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        const dir = sortOrder === 'asc' ? 1 : -1;
        const valA = a[sortField];
        const valB = b[sortField];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB) * dir;
        }

        return ((valA as number) - (valB as number)) * dir;
      });
    }

    setVisiblePeople(filtered);
  }, [people, sortBySex, selectedCenturies, sortByQuery, sortField, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {error === 'Something went wrong' && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}

      {error === 'There are no people on the server' && (
        <p data-cy="noPeopleMessage">{error}</p>
      )}

      {!loading && error === 'none' && (
        <div className="columns">
          <div className="column is-two-thirds">
            {visiblePeople.length > 0 ? (
              <PeopleTable
                people={visiblePeople}
                sortField={sortField}
                setSortField={setSortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            ) : (
              <p className="column is-two-thirds">
                There are no people matching the current filters
              </p>
            )}
          </div>

          <div className="column">
            <PeopleFilters
              selectedCenturies={selectedCenturies}
              setSelectedCenturies={setSelectedCenturies}
              sortBySex={sortBySex}
              setSortBySex={setSortBySex}
              sortByQuery={sortByQuery}
              setSortByQuery={setSortByQuery}
            />
          </div>
        </div>
      )}
    </>
  );
};
