import { FC } from 'react';
import { SearchLink } from './SearchLink';
import { SexFilterValues } from '../types/Filter';

type Props = {
  query: string;
  handleQueryChange: (query: string) => void;
  sex: string;
  centuriesArr: string[];
  centuries: string[] | null;
};

export const PeopleFilters: FC<Props> = props => {
  const { query, handleQueryChange, sex, centuriesArr, centuries } = props;

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
            {centuriesArr.map(century => {
              const isSelected = centuries?.includes(century);
              const updatedCenturies = isSelected
                ? centuries.filter(c => c !== century)
                : [...(centuries || []), century];

              return (
                <SearchLink
                  key={century}
                  params={{ centuries: updatedCenturies.join(',') }}
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                >
                  {century}
                </SearchLink>
              );
            })}
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
