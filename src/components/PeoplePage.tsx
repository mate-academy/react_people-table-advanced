/* eslint-disable prettier/prettier */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeople } from '../hooks/usePeople';


export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const { people, loading, error } = usePeople();

  const query = (() => {
    const q = searchParams.get('query');

    return q && q.trim() ? q.toLowerCase() : null;
  })();

  const sex = (() => {
    const value = searchParams.get('sex');

    return value === 'm' || value === 'f' ? value : null;
  })();

  const centuries = searchParams.getAll('centuries');

  const sort = (() => {
    const s = searchParams.get('sort');

    return s === 'name' || s === 'sex' || s === 'born' || s === 'died'
      ? s
      : null;
  })();

  const order = (() => {
    const o = searchParams.get('order');

    return o === 'asc' || o === 'desc' ? o : null;
  })();


  // --- FILTERING + SORTING ---------------------------------------------------

  const filtered = useMemo(() => {
    let result = people;

    if (query) {
      result = result.filter(p => {
        const name = p.name.toLowerCase();
        const mother = p.motherName?.toLowerCase() ?? '';
        const father = p.fatherName?.toLowerCase() ?? '';

        return (
          name.includes(query) ||
          mother.includes(query) ||
          father.includes(query)
        );
      });
    }



    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(p => {
        if (!p.born) {
          return false;
        }

        const century = Math.floor((p.born - 1) / 100) + 1;

        return centuries.includes(String(century));
      });
    }

    if (!sort) {
      return result;
    }

    return [...result].sort((a, b) => {
      const A = a[sort];
      const B = b[sort];

      if (A == null || B == null) {
        return A == null ? 1 : -1;
      }

      if (A < B) {
        return order === 'desc' ? 1 : -1;
      }

      if (A > B) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length > 0 && <PeopleFilters />}
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

              {!loading &&
                !error &&
                people.length > 0 &&
                filtered.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && filtered.length > 0 && (
                <PeopleTable people={filtered} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
