import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../types/Person';
import { PeopleFilters } from '../PeopleFilter/PeopleFilter';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем параметры сортировки из URL
  const initialSortField = searchParams.get('sortField') as keyof Person | null;
  const initialSortOrder = searchParams.get('sortOrder') as
    | 'asc'
    | 'desc'
    | null;

  const [sortField, setSortField] = useState<keyof Person | null>(
    initialSortField,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(
    initialSortOrder,
  );

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('century') || [];

  let filteredPeople = people.filter(person => {
    const matchesName = (name: string) =>
      name.toLowerCase().includes(query.toLowerCase());
    const century = Math.floor((person.born + 99) / 100);

    return (
      (query === '' ||
        matchesName(person.name) ||
        matchesName(person.motherName || '') ||
        matchesName(person.fatherName || '')) &&
      (sex === '' || person.sex === sex) &&
      (centuries.length === 0 || centuries.includes(century.toString()))
    );
  });

  if (sortField) {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }

  const handleSort = (field: keyof Person) => {
    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';

    setSortField(field);
    setSortOrder(newSortOrder);

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortField: field,
      sortOrder: newSortOrder,
    });
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {people.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <>
                      {filteredPeople.length === 0 ? (
                        <p>
                          There are no people matching the current search
                          criteria
                        </p>
                      ) : (
                        <PeopleTable
                          people={filteredPeople}
                          selectedSlug={slug}
                          onSort={handleSort}
                          sortField={sortField}
                          sortOrder={sortOrder}
                        />
                      )}
                    </>
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
