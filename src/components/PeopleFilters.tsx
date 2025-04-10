import { useSearchParams } from 'react-router-dom';
import { SexOptions, SexParamMap } from '../types/SexOptions';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries: number[] = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex') || SexOptions.ALL;
  
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  const handleCenturyClick = (century: number) => {
    const isSelected = centuries.includes(century);
    const updatedCenturies = isSelected
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return updatedCenturies.map(String);
  };

  const isFiltersReset =
    sex === SexOptions.ALL 
    && !centuries.length 
    && query === '';
  
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(SexOptions).map(option => {
          const paramValue = SexParamMap[option];
          const isActive = sex === paramValue;

          return (
            <SearchLink
              key={option}
              className={classNames({ 'is-active': isActive })}
              params={{ sex: paramValue }}
            >
              {option}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query.trimStart()}
            onChange={handleQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => {
              const isSelected = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', { 'is-info': isSelected })}
                  params={{ centuries: handleCenturyClick(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}
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
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': isFiltersReset,
          })}
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
