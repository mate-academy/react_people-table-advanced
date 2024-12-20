import { FC } from 'react';
import { SearchLink } from './SearchLink';
import { SexFilterValues } from '../types';

type Props = {
  query: string;
  handleQueryChange: (query: string) => void;
  sex: string;
  centuriesList: string[];
  centuries: string[] | null;
};

export const PeopleFilters: FC<Props> = ({
  query,
  handleQueryChange,
  sex,
  centuriesList,
  centuries,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilterValues).map(([key, value]) => (
          <SearchLink
            params={{
              sex: value === 'All' ? null : key.toLowerCase(),
            }}
            key={key}
            className={
              sex === key.toLowerCase() || (key === 'All' && sex === '')
                ? 'is-active'
                : ''
            }
          >
            {value}
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
            {centuriesList.map(century => (
              <SearchLink
                params={{
                  centuries: centuries?.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...(centuries || []), century],
                }}
                key={century}
                data-cy="century"
                className={`button mr-1 ${
                  centuries?.includes(century) ? 'is-info' : ''
                }`}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: null,
              }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            centuries: null,
            query: null,
            sex: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
