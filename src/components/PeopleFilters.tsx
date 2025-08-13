import classNames from 'classnames';
import { Sex } from '../types/Sex';
import { centuriesOptions } from '../constants/centuriesOptions';
import { useContext } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { SearchLink } from './SearchLink';
import { sexOptions } from '../constants/sexOptions';
import { initialParams } from '../constants/initialParams';

export const PeopleFilters = () => {
  const { query, sex, centuries, updateSearchParams } =
    useContext(FiltersContext);

  const handleQueryChange = (value: string) => {
    const cleaned = value.replace(/\s+/g, ' ');

    updateSearchParams({ query: cleaned });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Sex).map(value => (
          <SearchLink
            key={value}
            params={{
              sex: value === Sex.All ? null : value,
            }}
            className={classNames({
              'is-active': sex === value,
            })}
          >
            {sexOptions[value]}
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
            onChange={e => handleQueryChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesOptions.map(century => {
              return (
                <SearchLink
                  data-cy="century"
                  key={century}
                  params={{
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }}
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
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
              params={{
                centuries: null,
              }}
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={initialParams}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
