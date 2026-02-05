import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type User = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
};

export const PeoplePage = () => {
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );
  const sortedRow = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const peopleFilter = useMemo(() => {
    let peopleFiltered = users ?? [];
    const queryInsensetive = query.trim().toLowerCase();

    if (queryInsensetive) {
      peopleFiltered = peopleFiltered.filter(
        person =>
          person.name.toLowerCase().includes(queryInsensetive) ||
          (person.fatherName ?? '').toLowerCase().includes(queryInsensetive) ||
          (person.motherName ?? '').toLowerCase().includes(queryInsensetive),
      );
    }

    if (currentSex) {
      peopleFiltered = peopleFiltered.filter(
        person => person.sex === currentSex,
      );
    }

    if (centuries.length > 0) {
      peopleFiltered = peopleFiltered.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sortedRow === 'name') {
      peopleFiltered = peopleFiltered
        .slice()
        .sort((p1, p2) => p1.name.localeCompare(p2.name));
    }

    if (sortedRow === 'sex') {
      peopleFiltered = peopleFiltered
        .slice()
        .sort((p1, p2) => p1.sex.localeCompare(p2.sex));
    }

    if (sortedRow === 'born') {
      peopleFiltered = peopleFiltered
        .slice()
        .sort((p1, p2) => p1.born - p2.born);
    }

    if (sortedRow === 'died') {
      peopleFiltered = peopleFiltered
        .slice()
        .sort((p1, p2) => p1.died - p2.died);
    }

    if (sortOrder === 'desc') {
      peopleFiltered = peopleFiltered.slice().reverse();
    }

    return peopleFiltered;
  }, [users, query, currentSex, centuries, sortedRow, sortOrder]);

  useEffect(() => {
    setLoading(true);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(usersFromServer => {
        setUsers(usersFromServer);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="section">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && users !== undefined && users.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && users && users?.length > 0 && !error && (
                <PeopleTable users={peopleFilter} />
              )}

              {peopleFilter.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
