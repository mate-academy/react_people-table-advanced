import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const initialQuery = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((newQery: string) => {
        const search = getSearchWith(searchParams, {
          query: newQery.trim() || null,
        });

        setSearchParams(search);
      }, 1000),
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    return debouncedSetSearch.cancel();
  }, [debouncedSetSearch]);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchQuery(value);
    debouncedSetSearch(value);
  };

  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '');
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            value={searchQuery}
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(ch => century !== ch)
                    : [...centuries, century],
                }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ centuries: null, sex: null, query: null }}
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': centuries.length === 0 && !sex && !searchQuery,
          })}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
