import React, { useMemo } from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = { people: Person[] };

export const PeopleFilters: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const centuries = useMemo(() => {
    const set = new Set<string>();

    people.forEach(p => set.add(String(Math.ceil(p.born / 100))));

    return Array.from(set).sort((a, b) => Number(a) - Number(b));
  }, [people]);

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!searchParams.get('sex') ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block" data-cy="NameFilter">
        <p className="control has-icons-left is-expanded">
          <input
            type="text"
            className="input"
            placeholder="Search by name, mother or father"
            defaultValue={query}
            onChange={e => {
              const value = e.currentTarget.value.trim();
              const next = getSearchWith(searchParams, {
                query: value ? value : null,
              });

              window.history.replaceState(null, '', `?${next}`);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-search" />
          </span>
        </p>
      </div>

      <div className="panel-block" data-cy="CenturyFilter">
        <div className="is-flex is-flex-direction-column is-fullwidth">
          <div className="field is-grouped is-grouped-multiline">
            {centuries.map(c => {
              const isActive = selectedCenturies.includes(c);
              const nextCenturies = isActive
                ? selectedCenturies.filter(x => x !== c)
                : [...selectedCenturies, c];

              return (
                <SearchLink
                  key={c}
                  className={`button is-link is-light ${isActive ? 'is-info' : ''}`}
                  params={{
                    centuries: nextCenturies.length ? nextCenturies : null,
                  }}
                >
                  {c}th
                </SearchLink>
              );
            })}
            <SearchLink
              className={`button is-light ${selectedCenturies.length === 0 ? 'is-info' : ''}`}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            centuries: null,
            sex: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
