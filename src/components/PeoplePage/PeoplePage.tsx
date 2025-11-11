import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleTable/PeopleFilters';
import { PeopleTable } from '../PeopleTable/PeopleTable';

type SortableField = 'name' | 'sex' | 'born' | 'died' | 'motherName' | 'fatherName';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams<{ slug?: string }>();
  const [activeSlug, setActiveSlug] = useState<string | null>(slug || null);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || 'asc';

  let visiblePeople = people
    .filter(person => !sex || person.sex === sex)
    .filter(
      person =>
        !centuries.length ||
        centuries.includes(String(Math.ceil(person.born / 100))),
    )
    .filter(
      person =>
        !query ||
        [person.name, person.motherName, person.fatherName].some(name =>
          name?.toLowerCase().includes(query),
        ),
    );

  const fieldKey = sortField as SortableField;

  if (sortField && sortOrder) {
    visiblePeople = [...visiblePeople].sort((a, b) => {
      const aValue: string | number | undefined | null = a[fieldKey];
      const bValue: string | number | undefined | null = b[fieldKey];

      const isNumeric =
        typeof aValue === 'number' && typeof bValue === 'number';

      if (isNumeric) {
        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }

        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }

        return 0;
      } else {
        const aStr = String(aValue || '').toLowerCase();
        const bStr = String(bValue || '').toLowerCase();

        if (aStr > bStr) {
          return sortOrder === 'asc' ? 1 : -1;
        }

        if (aStr < bStr) {
          return sortOrder === 'asc' ? -1 : 1;
        }

        return 0;
      }
    });
  }

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoading && slug) {
      setActiveSlug(slug);
    }
  }, [isLoading, slug]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="block">
        <div className="box table-container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        </div>
      </div>
    );
  }

  if (!people.length) {
    return (
      <div className="block">
        <div className="box table-container">
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="block">
        <div className="box table-container">
          <h1 className="title">People Page</h1>
        </div>
      </div>

      <PeopleFilters />

      <PeopleTable
        people={visiblePeople}
        activeSlug={activeSlug}
        sortBy={sortField}
        order={sortOrder as 'asc' | 'desc'}
        setSearchParams={setSearchParams}
      />
    </>
  );
};
