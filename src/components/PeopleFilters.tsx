/* eslint-disable no-console */
import cn from 'classnames';
import {
  Dispatch,
  SetStateAction,
  useCallback, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

function debounce(callback: Dispatch<SetStateAction<string>>, delay: number) {
  let timerId = 0;

  return (...args: unknown[]) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback([...args].join());
    }, delay);
  };
}

const placeholderCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const sex = searchParams.get('sex');
  const [appliedQuery, setAppliedQuery] = useState(
    searchParams.get('query') || '',
  );

  const queryWrapper = useCallback(
    debounce(setAppliedQuery,
      1000),
    [],
  );

  useEffect(() => {
    if (appliedQuery) {
      searchParams.set('query', appliedQuery);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  }, [appliedQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
    queryWrapper(value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {placeholderCenturies.map((century) => {
              const centuries = searchParams.getAll('centuries');
              const hasCentury = centuries.includes(century);

              return (
                <SearchLink
                  data-cy="century"
                  key={century}
                  className={cn('button mr-1', { 'is-info': hasCentury })}
                  params={{
                    centuries: hasCentury
                      ? centuries.filter((c) => c !== century)
                      : [...centuries, century],
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
