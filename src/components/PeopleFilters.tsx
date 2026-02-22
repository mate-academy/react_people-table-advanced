// src/components/PeopleFilters.tsx (updated with query sync and sorting moved to PeoplePage useEffect? Wait, actually integrated sorting into filter effect for filteredPeople)

import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  setFilteredPeople: Dispatch<SetStateAction<Person[]>>;
};

export const PeopleFilters: React.FC<Props> = ({
  people,
  setFilteredPeople,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('query') || '');

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    let filtered = people;

    // Sex filter
    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    // Query filter
    const searchTerm = query.trim().toUpperCase();

    if (searchTerm) {
      filtered = filtered.filter(person =>
        [person.name, person.motherName, person.fatherName].some(field =>
          field?.toUpperCase().includes(searchTerm),
        ),
      );
    }

    // Centuries filter
    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.floor((person.born - 1) / 100 + 1).toString();

        return centuries.includes(century);
      });
    }

    // Sorting
    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;

        switch (sort) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'sex':
            comparison = a.sex.localeCompare(b.sex);
            break;
          case 'born':
          case 'died':
            comparison = (a[sort] ?? 0) - (b[sort] ?? 0);
            break;
          default:
            break;
        }

        return order === 'asc' ? comparison : -comparison;
      });
    }

    setFilteredPeople(filtered);
  }, [people, sex, centuries, query, sort, order, setFilteredPeople]);

  const toggleCentury = (century: string) => {
    const current = searchParams.getAll('centuries');
    const next = current.includes(century)
      ? current.filter(c => c !== century)
      : [...current, century];

    setSearchParams(
      getSearchWith(searchParams, { centuries: next.length ? next : null }),
    );
  };

  const isCenturyActive = (century: string) => centuries.includes(century);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={getSearchWith(searchParams, { sex: null })}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={getSearchWith(searchParams, { sex: 'm' })}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={getSearchWith(searchParams, { sex: 'f' })}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search by name, mother or father"
            value={query}
            onChange={e => {
              const newValue = e.target.value;

              setQuery(newValue);
              setSearchParams(
                getSearchWith(searchParams, { query: newValue.trim() || null }),
              );
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {(['16', '17', '18', '19', '20'] as const).map(century => (
              <button
                key={century}
                type="button"
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': isCenturyActive(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              onClick={() =>
                setSearchParams(
                  getSearchWith(searchParams, { centuries: null }),
                )
              }
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
