import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  // #region hooks navigate useParams
  const { slug: slugFromUrl } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlug, setSelectSlug] = useState<string | null>(null);
  // #endregion

  // #region searchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = (searchParams.get('query') || '').trim().toLocaleLowerCase();
  const centuries = searchParams.getAll('centuries');
  const centuryOf = (year: number) => Math.floor((year - 1) / 100) + 1;
  // #endregion

  // #region Sorted Filtered
  const filteredPeople = useMemo(() => {
    let res = people;

    if (sex === 'm' || sex === 'f') {
      res = res.filter(p => p.sex === sex);
    }

    if (query) {
      const norm = (s?: string | null) => (s || '').toLowerCase();

      res = res.filter(p => {
        const mother = norm(p.motherName);
        const father = norm(p.fatherName);

        return (
          norm(p.name).includes(query) ||
          mother.includes(query) ||
          father.includes(query)
        );
      });
    }

    if (centuries.length > 0) {
      const set = new Set(centuries.map(Number));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      res = res.filter(p => set.has(centuryOf(p.born)));
    }

    return res;
  }, [people, sex, query, centuries]);

  const handleSort = (field: SortField) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const next = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      next.set('sort', field);
      next.delete('order');
    } else if (!currentOrder) {
      next.set('order', 'desc');
    } else {
      next.delete('sort');
      next.delete('order');
    }

    setSearchParams(next);
  };

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const copyPeople = [...filteredPeople];

    copyPeople.sort((a, b) => {
      const av = a[sort as keyof Person];
      const bv = b[sort as keyof Person];

      if (typeof av === 'string' && typeof bv === 'string') {
        return av.localeCompare(bv);
      }

      if (typeof av === 'number' && typeof bv === 'number') {
        return av - bv;
      }

      return 0;
    });

    if (order === 'desc') {
      copyPeople.reverse();
    }

    return copyPeople;
  }, [filteredPeople, sort, order]);
  // #endregion

  // #region RenderPeople targetPeople yellow line
  useEffect(() => {
    setLoading(true);
    setError(null);

    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSelectSlug(slugFromUrl ?? null);
  }, [slugFromUrl]);

  const handleRowSelect = (slug: string) => {
    setSelectSlug(slug);
    navigate({
      pathname: `/people/${slug}`,
      search: `?${searchParams.toString()}`,
    });
  };

  const byName = useMemo(() => {
    const map = new Map<string, Person>();

    for (const p of people) {
      map.set(p.name, p);
    }

    return map;
  }, [people]);
  // #endregion

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              {!error && !loading && people.length > 0 && (
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

                  {!error && !loading && people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!error && !loading && people.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {!error && !loading && people.length > 0 && (
                    <PeopleTable
                      people={sortedPeople}
                      selectedSlug={selectedSlug}
                      onSelect={handleRowSelect}
                      onSort={handleSort}
                      sort={sort}
                      order={order}
                      resolveRelative={name => byName.get(name) ?? null}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
