import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const onQueryChange = (text: string) => {
    setSearchParams(
      getSearchWith(searchParams, { query: text || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': !sex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === 'f',
          })}
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
            value={query}
            className="input"
            placeholder="Search"
            onChange={event => onQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
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
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
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
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
