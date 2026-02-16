import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api';
import { Person } from '../types/Person';

type SortField = 'name' | 'sex' | 'born' | 'died';
type SexFilter = 'm' | 'f' | null;

const getCentury = (year: number) => Math.ceil(year / 100);

const getParentName = (parent: Person['mother'] | Person['father']): string => {
  if (!parent) {
    return '';
  }

  if (typeof parent === 'string') {
    return '';
  }

  return parent.name || '';
};

const matchesQuery = (p: Person, q: string) => {
  const query = q.trim().toLowerCase();

  if (!query) {
    return true;
  }

  const fields = [
    p.name,
    p.motherName,
    p.fatherName,
    getParentName(p.mother),
    getParentName(p.father),
  ]
    .filter(Boolean)
    .map(v => v!.toLowerCase());

  return fields.some(v => v.includes(query));
};

const matchesCenturies = (p: Person, centuries: string[]) => {
  if (centuries.length === 0) {
    return true;
  }

  const personCentury = String(getCentury(p.born));

  return centuries.includes(personCentury);
};

const comparePeople = (a: Person, b: Person, field: SortField) => {
  switch (field) {
    case 'name':
    case 'sex':
      return String(a[field]).localeCompare(String(b[field]));

    case 'born':
      return a.born - b.born;

    case 'died': {
      const av = a.died ?? Number.NEGATIVE_INFINITY;
      const bv = b.died ?? Number.NEGATIVE_INFINITY;

      return av - bv;
    }

    default:
      return 0;
  }
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
        setPeople([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const sex = (searchParams.get('sex') as SexFilter) || null;
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const visiblePeople = useMemo(() => {
    const filtered = people
      .filter(p => matchesQuery(p, query))
      .filter(p => matchesCenturies(p, centuries))
      .filter(p => (!sex ? true : p.sex === sex));

    const sorted = [...filtered];

    if (sort) {
      sorted.sort((a, b) => comparePeople(a, b, sort));

      if (order === 'desc') {
        sorted.reverse();
      }
    }

    return sorted;
  }, [people, query, sex, centuries, sort, order]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      {hasError && (
        <p className="notification is-danger" data-cy="peopleLoadingError">
          Something went wrong
        </p>
      )}

      {!hasError && people.length === 0 && (
        <p className="notification is-warning" data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {!hasError && people.length > 0 && (
        <div className="columns">
          <div className="column">
            <PeopleTable people={visiblePeople} />
          </div>

          <div className="column is-one-quarter">
            <PeopleFilters />
          </div>
        </div>
      )}
    </>
  );
};
