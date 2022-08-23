import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import {
  ChangeEvent, useCallback, useMemo, useState,
} from 'react';
import { SearchLink } from '../SearchLink';

export const FilterPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = useMemo(() => searchParams.get('sex'), [searchParams]);
  const century = useMemo(() => searchParams.getAll('century'), [searchParams]);
  const setCenturies = (param: string) => {
    if (century.includes(param)) {
      return [...century];
    }

    return [...century, param];
  };

  const applySearchParams = useCallback(
    debounce((query: string) => {
      if (query) {
        setSearchParams({ query });
      } else {
        searchParams.delete('query');
        setSearchParams(searchParams);
      }
    }, 500),
    [],
  );

  const [searchValue, setSearchValue] = useState('');

  const handleSearchPerson = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    applySearchParams(event.target.value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filter</p>
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
            type="text"
            placeholder="Search value"
            data-cy="NameFilter"
            className="input"
            value={searchValue}
            onChange={handleSearchPerson}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              params={{ century: setCenturies('16') }}
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': century.includes('16') },
              )}
            >
              16
            </SearchLink>
            <SearchLink
              params={{ century: setCenturies('17') }}
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': century.includes('17') },
              )}
            >
              17
            </SearchLink>
            <SearchLink
              params={{ century: setCenturies('18') }}
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': century.includes('18') },
              )}
            >
              18
            </SearchLink>
            <SearchLink
              params={{ century: setCenturies('19') }}
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': century.includes('19') },
              )}
            >
              19
            </SearchLink>
            <SearchLink
              params={{ century: setCenturies('20') }}
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': century.includes('20') },
              )}
            >
              20
            </SearchLink>
          </div>
          <div className="level-right ml-4">
            <SearchLink
              params={{ century: null }}
              data-cy="centuryAll"
              className={classNames(
                'button is-success',
                { 'is-outlined': century.length > 0 },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <SearchLink
          params={{ sex: null, century: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchValue('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
