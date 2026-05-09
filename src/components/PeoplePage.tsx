import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

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

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          (p.motherName || '').toLowerCase().includes(q) ||
          (p.fatherName || '').toLowerCase().includes(q),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    if (sort) {
      result.sort((a, b) => {
        let cmp = 0;

        switch (sort) {
          case 'name':
          case 'sex':
            cmp = a[sort].localeCompare(b[sort]);
            break;
          case 'born':
          case 'died':
            cmp = a[sort] - b[sort];
            break;
        }

        return order === 'desc' ? -cmp : cmp;
      });
    }

    return result;
  }, [people, sex, query, centuries, sort, order]);

  const loaded = !loading && !error;
  const hasPeople = loaded && people.length > 0;
  const noPeople = loaded && people.length === 0;
  const noMatches = hasPeople && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
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

              {noPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && !noMatches && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
