import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const centuriesList = ['16', '17', '18', '19', '20'];
  const sex = searchParams.get('sex');

  const onQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentParams = searchParams;
      let newParams;
      const targetValue = event.target.value;

      if (event.target.value) {
        newParams = getSearchWith(currentParams, { query: targetValue });
      } else {
        newParams = getSearchWith(currentParams, { query: null });
      }

      navigate({ search: newParams });
    }, [searchParams],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': sex === null,
          })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === 'm',
          })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === 'f',
          })}
          params={{
            sex: 'f',
          }}
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
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
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
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{
                centuries: [],
              }}
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
            centuries: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
