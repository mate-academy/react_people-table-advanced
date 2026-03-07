import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FILTER_KEYS } from '../constants/filters';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get(FILTER_KEYS.query) || '',
  );

  const queryParam = searchParams.get(FILTER_KEYS.query) || '';
  const sexParam = searchParams.get(FILTER_KEYS.sex) || '';
  const activeCenturies = searchParams.getAll(FILTER_KEYS.centuries);

  useEffect(() => {
    setInputValue(queryParam);
  }, [queryParam]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sexParam })}
          params={{ [FILTER_KEYS.sex]: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexParam === 'm' })}
          params={{ [FILTER_KEYS.sex]: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexParam === 'f' })}
          params={{ [FILTER_KEYS.sex]: 'f' }}
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
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
              setSearchParams(
                getSearchWith(searchParams, {
                  [FILTER_KEYS.query]: e.target.value || null,
                }),
                { replace: true },
              );
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-search" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': activeCenturies.includes(century),
                })}
                params={{
                  [FILTER_KEYS.centuries]: activeCenturies.includes(century)
                    ? activeCenturies.filter(c => c !== century)
                    : [...activeCenturies, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': activeCenturies.length > 0,
              })}
              params={{ [FILTER_KEYS.centuries]: null }}
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
            [FILTER_KEYS.query]: null,
            [FILTER_KEYS.sex]: null,
            [FILTER_KEYS.centuries]: null,
            [FILTER_KEYS.sort]: null,
            [FILTER_KEYS.order]: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
