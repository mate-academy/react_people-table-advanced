import React, { useMemo } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SexType } from '../types/filterType';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const activeSex = searchParams.get('sex') || null;
  const centuries = useMemo(
    () => searchParams.getAll('century').sort(),
    [searchParams],
  );

  const centuryArray = ['16', '17', '18', '19', '20'];
  const sexTypes: SexType[] = ['m', 'f'];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={activeSex === null ? 'is-active' : ''}
        >
          All
        </SearchLink>

        {sexTypes.map(type => (
          <SearchLink
            key={type}
            params={{ sex: type }}
            className={activeSex === type ? 'is-active' : ''}
          >
            {type === 'm' ? 'Male' : type === 'f' ? 'Female' : type}
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
            value={query}
            onChange={ev => {
              handleQueryChange(ev);
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
            {centuryArray.map(cent => (
              <SearchLink
                key={+cent}
                params={{
                  century: centuries.includes(cent)
                    ? centuries.filter(c => c !== cent)
                    : [...centuries, cent],
                }}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(cent),
                })}
              >
                {cent}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ century: null }}
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ query: null, sex: null, century: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
