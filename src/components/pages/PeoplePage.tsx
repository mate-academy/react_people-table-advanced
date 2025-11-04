import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import type { Person } from '../../types/Person';

enum LoadStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const getCentury = (year: number | null | undefined) => {
  if (year == null) {
    return null;
  }

  return Math.ceil(year / 100);
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.Idle);
  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').trim();
  const sex = searchParams.get('sex');
  const sort =
    (searchParams.get('sort') as 'name' | 'sex' | 'born' | 'died' | null) ||
    null;
  const order = (searchParams.get('order') || 'asc') as 'asc' | 'desc';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setStatus(LoadStatus.Loading);
    getPeople()
      .then(setPeople)
      .then(() => setStatus(LoadStatus.Success))
      .catch(() => setStatus(LoadStatus.Error));
  }, []);

  let filteredPeople = [...people];

  if (sex === 'm' || sex === 'f') {
    filteredPeople = filteredPeople.filter(p => p.sex === sex);
  }

  if (query) {
    const q = query.toLowerCase();

    filteredPeople = filteredPeople.filter(p =>
      [p.name, p.motherName, p.fatherName]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q)),
    );
  }

  if (centuries.length) {
    const set = new Set(centuries.map(c => Number(c)));

    filteredPeople = filteredPeople.filter(p =>
      set.has(getCentury(p.born) ?? -1),
    );
  }

  if (sort) {
    const dir = order === 'desc' ? -1 : 1;

    filteredPeople.sort((a, b) => {
      const av = a[sort] as unknown;
      const bv = b[sort] as unknown;

      if (av == null && bv == null) {
        return 0;
      }

      if (av == null) {
        return -1 * dir;
      }

      if (bv == null) {
        return 1 * dir;
      }

      if (typeof av === 'number' && typeof bv === 'number') {
        return (av - bv) * dir;
      }

      return String(av).localeCompare(String(bv)) * dir;
    });
  }

  const isLoading = status === LoadStatus.Loading;
  const isError = status === LoadStatus.Error;
  const isLoaded = status === LoadStatus.Success;
  const hasPeopleOnServer = isLoaded && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeopleOnServer && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isLoaded && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeopleOnServer && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeopleOnServer && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
