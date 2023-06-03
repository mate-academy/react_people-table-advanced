/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  onQueryChange: (query: string) => void,
  onSexChange: (sex: string) => void,
  onCenturiesChange: (century: string) => void,
  deleteCenturies: () => void,
  onReset: () => void,
};

export const PeopleFilters: React.FC<Props> = ({
  onQueryChange,
  onSexChange,
  onCenturiesChange,
  deleteCenturies,
  onReset,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const centuryArray = ['16', '17', '18', '19', '20'];

  function updateSearch(params: { [key: string]: string | null }) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    setSearchParams(searchParams);
  }

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(query);

    updateSearch({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames('', { 'is-active': sex === '' })}
          params={{ sex: null }}
          onClick={() => onSexChange('all')}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          onClick={() => onSexChange('m')}
          className={classNames('', { 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          onClick={() => onSexChange('f')}
          className={classNames('', { 'is-active': sex === 'f' })}
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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryArray.map(century => (
              <SearchLink
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cent => cent !== century)
                    : [...centuries, century],
                }}
                key={century}
                onClick={() => onCenturiesChange(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#"
              onClick={() => deleteCenturies()}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={() => onReset()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
