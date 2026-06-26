import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader/Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        const peopleWithParents = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      const q = query.toLowerCase();

      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.motherName?.toLowerCase().includes(q) ||
          p.fatherName?.toLowerCase().includes(q),
      );
    }

    if (sex) {
      filtered = filtered.filter(p => p.sex === sex);
    }

    if (centuries.length) {
      filtered = filtered.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    if (sort) {
      filtered.sort((a, b) => {
        let result = 0;

        switch (sort) {
          case 'name':
          case 'sex':
            result = a[sort].localeCompare(b[sort]);
            break;
          case 'born':
          case 'died':
            result = a[sort] - b[sort];
            break;
        }

        return order === 'desc' ? -result : result;
      });
    }

    return filtered;
  }, [people, query, sex, centuries, sort, order]);

  const dataLoaded = !loading && !error && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {dataLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {dataLoaded && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {dataLoaded && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
