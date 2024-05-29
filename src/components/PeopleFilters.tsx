import { ChangeEventHandler } from 'react';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const PeopleFilters = ({
  onSearchChange,
  sex = '',
  centuries = [],
  query = '',
}: {
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  sex?: string;
  centuries?: string[];
  query?: string;
}) => {
  const isActive = (key: string, value: string) => {
    if (key === 'sex') {
      return sex === value;
    } else {
      return centuries.includes(value);
    }
  };

  const toggleCenturies = (centuryParam: string) => {
    const params: SearchParams = { sex, query };
    const newCenturies = centuries.includes(centuryParam)
      ? centuries.filter(century => century !== centuryParam)
      : [...centuries, centuryParam];

    params.centuries = newCenturies;

    return params;
  };

  const isAllActive = () => {
    return centuries.length === 0;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink
          className={isActive('sex', 'm') ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={isActive('sex', 'f') ? 'is-active' : ''}
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
            className="input"
            placeholder="Search"
            onChange={onSearchChange}
            value={query}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={`button mr-1 ${isActive('centuries', century) ? 'is-info' : ''}`}
                params={toggleCenturies(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button ${isAllActive() ? 'is-success' : 'is-success is-outlined'}`}
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
