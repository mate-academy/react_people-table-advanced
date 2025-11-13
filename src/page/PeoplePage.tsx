import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

function getCentury(year: number) {
  return Math.ceil(year / 100);
}

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    getPeople()
      .then(data => {
        if (cancelled) {
          return;
        }

        setPeople(data);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setError('Something went wrong');
      })
      .finally(() => {
        if (cancelled) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') as
    | 'name'
    | 'sex'
    | 'born'
    | 'died'
    | null;
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const visiblePeople = useMemo(() => {
    let list = [...people];

    if (sex === 'm' || sex === 'f') {
      list = list.filter(person => person.sex === sex);
    }

    if (query) {
      list = list.filter(person => {
        const pool = [
          person.name,
          person.motherName || '',
          person.fatherName || '',
        ]
          .join(' ')
          .toLowerCase();

        return pool.includes(query);
      });
    }

    if (centuries.length > 0) {
      const set = new Set(centuries.map(century => Number(century)));

      list = list.filter(person => set.has(getCentury(person.born)));
    }

    if (sortField) {
      const getKey = (person: Person) => {
        switch (sortField) {
          case 'name':
            return person.name.toLowerCase();
          case 'sex':
            return person.sex;
          case 'born':
            return person.born;
          case 'died':
            return person.died;
          default:
            return 0;
        }
      };

      const asc = [...list].sort((a, b) => {
        const ka = getKey(a);
        const kb = getKey(b);

        if (ka < kb) {
          return -1;
        }

        if (ka > kb) {
          return 1;
        }

        return 0;
      });

      list = order === 'desc' ? asc.reverse() : asc;
    }

    return list;
  }, [people, sex, query, centuries, sortField, order]);

  const noPeople = !isLoading && !error && people.length === 0;
  const hasPeople = !isLoading && !error && people.length > 0;
  const noMatches = hasPeople && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
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
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
