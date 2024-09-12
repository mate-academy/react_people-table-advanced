import { FilterTypes } from '../enums/FilterTypes';
import { Centuries } from '../enums/Centuries';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParamsValues } from '../enums/SearchParams';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter =
    searchParams.get(SearchParamsValues.SEX) || FilterTypes.All;
  const searchQuery = searchParams.get(SearchParamsValues.SEARCH_QUERY) || '';
  const centuries = searchParams.getAll(SearchParamsValues.CENTURIES) || [];

  const updateCenturiesList = century => {
    return centuries.includes(century)
      ? centuries.filter(centuryValue => centuryValue !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterTypes).map(([key, value]) => (
          <SearchLink
            key={key}
            className={classNames({
              'is-active': value == activeFilter,
            })}
            params={{
              sex: value ? value : null,
            }}
          >
            {key}
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
            value={searchQuery}
            onChange={e =>
              setSearchParams(
                getSearchWith(searchParams, {
                  searchQuery: e.target.value || null,
                }),
              )
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(Centuries).map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: updateCenturiesList(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{
            sex: null,
            searchQuery: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
