import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { useProjectParams } from '../utils/useProjectParams';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../utils/searchHelper';

const sexLinks: Record<string, string | null> = {
  All: null,
  Male: 'm',
  Female: 'f',
};

const centuriesLinks = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const { search, searchParams, setSearchParams } = useProjectParams();
  const [inputValue, setInputValue] = useState(search.query || '');

  useEffect(() => {
    setInputValue(search.query || '');
  }, [search.query]);

  const resetFiltersPayload = {
    query: null,
    sex: null,
    centuries: null,
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(sexLinks).map(link => (
          <SearchLink
            key={link}
            params={{ sex: sexLinks[link] }}
            className={cn({ 'is-active': search.sex === sexLinks[link] })}
          >
            {link}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={inputValue}
            onChange={e => {
              const value = e.target.value;

              setInputValue(value);
              setSearchParams(
                getSearchWith(searchParams, { query: value || null }),
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
            {centuriesLinks.map(century => {
              const currentCenturies = search.centuries || [];

              const activeCenturies = currentCenturies.includes(century)
                ? currentCenturies.filter(cent => century !== cent)
                : [...currentCenturies, century];

              return (
                <SearchLink
                  data-cy="century"
                  key={century}
                  params={{ centuries: [...activeCenturies] }}
                  className={cn('button mr-1', {
                    'is-info': search.centuries?.includes(century),
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={cn('button is-success', {
                'is-outlined': search.centuries,
              })}
            >
              {'All'}
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={resetFiltersPayload}
          className="button is-link is-outlined is-fullwidth"
          // to="/people"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
