import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

type PeopleFiltersProps = {
  people: Person[];
  setFilteredPeople: (filteredPeople: Person[]) => void;
};

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  people,
  setFilteredPeople,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Отримувати значення фільтрів з URL
  const queryFromUrl = searchParams.get('query') || '';
  const sexFromUrl = searchParams.get('sex') || 'all';
  const centuriesFromUrl = searchParams.getAll('centuries') || [];

  const [query, setQuery] = useState(queryFromUrl);
  const [sexFilter, setSexFilter] = useState<'all' | 'm' | 'f'>(
    sexFromUrl as 'all' | 'm' | 'f',
  );
  const [centuryFilter, setCenturyFilter] = useState<number[]>(
    centuriesFromUrl.map(Number),
  );

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const personCentury = person.born ? Math.ceil(person.born / 100) : null;

      const matchesQuery =
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(query.toLowerCase())) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(query.toLowerCase()));

      return (
        matchesQuery &&
        (sexFilter === 'all' || person.sex === sexFilter) &&
        (centuryFilter.length === 0 ||
          (personCentury && centuryFilter.includes(personCentury)))
      );
    });
  }, [people, query, sexFilter, centuryFilter]);

  // Синхронізація стану з пошуковими параметрами URL
  useEffect(() => {
    setFilteredPeople(filteredPeople);

    const newSearch = getSearchWith(searchParams, {
      query: query || null,
      sex: sexFilter !== 'all' ? sexFilter : null,
      centuries: centuryFilter.length > 0 ? centuryFilter.map(String) : null,
    });

    setSearchParams(newSearch);
  }, [
    filteredPeople,
    query,
    sexFilter,
    centuryFilter,
    searchParams,
    setFilteredPeople,
    setSearchParams,
  ]);
  const toggleCenturyFilter = (century: number) => {
    setCenturyFilter(prev => {
      if (prev.includes(century)) {
        return prev.filter(item => item !== century);
      } else {
        return [...prev, century];
      }
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          onClick={() => setSexFilter('all')}
          className={sexFilter === 'all' ? 'is-active' : ''}
        >
          All
        </a>
        <a
          onClick={() => setSexFilter('m')}
          className={sexFilter === 'm' ? 'is-active' : ''}
        >
          Male
        </a>
        <a
          onClick={() => setSexFilter('f')}
          className={sexFilter === 'f' ? 'is-active' : ''}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <a
                key={century}
                data-cy="century"
                className={
                  centuryFilter.includes(century)
                    ? 'button mr-1 is-info'
                    : 'button mr-1'
                }
                href={`#/people?centuries=${century}`}
                onClick={e => {
                  e.preventDefault();
                  toggleCenturyFilter(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={e => {
                e.preventDefault();
                setCenturyFilter([]);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setQuery('');
            setSexFilter('all');
            setCenturyFilter([]);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
