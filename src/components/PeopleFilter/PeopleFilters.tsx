import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink/SearchLink';

const centuriesArray = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (text: string) => {
    setSearchParams(
      getSearchWith(searchParams, { query: text || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !currentSex,
          })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': currentSex === 'm',
          })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': currentSex === 'f',
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
            value={currentQuery}
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map(century => (
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
