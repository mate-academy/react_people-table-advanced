import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { FILTERS } from '../constants';
import { SearchParamsNames } from '../types';

const { sexFilter, centuriesFilter, resetAllParams } = FILTERS;

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(SearchParamsNames.Sex) ?? '';
  const query = searchParams.get(SearchParamsNames.Query) ?? '';
  const centuries = searchParams.getAll(SearchParamsNames.Centuries);
  const centuriesAllParam = centuriesFilter.find(
    searchParam => searchParam.value === null,
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilter.map(({ name, value }) => (
          <SearchLink
            key={name}
            params={{ [SearchParamsNames.Sex]: value }}
            className={
              sex === value || (!sex && value === null) ? 'is-active' : ''
            }
          >
            {name}
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
            onChange={event =>
              setSearchParams(
                getSearchWith(searchParams, {
                  [SearchParamsNames.Query]: event.target.value,
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
            {centuriesFilter
              .filter(searchParam => searchParam.value !== null)
              .map(({ name, value }) => (
                <SearchLink
                  key={name}
                  data-cy="century"
                  params={{
                    [SearchParamsNames.Centuries]: centuries.includes(
                      value.toString(),
                    )
                      ? centuries.filter(elem => elem !== value.toString())
                      : [...centuries, value.toString()],
                  }}
                  className={classNames('button', 'mr-1', {
                    'is-info': centuries.includes(value?.toString() ?? ''),
                  })}
                >
                  {name}
                </SearchLink>
              ))}
          </div>

          {centuriesAllParam && (
            <div className="level-right ml-4">
              <SearchLink
                data-cy="century"
                params={{
                  centuries: null,
                }}
                className={classNames('button', 'is-success', {
                  'is-outlined': centuries.length > 0,
                })}
              >
                {centuriesAllParam.name}
              </SearchLink>
            </div>
          )}
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={resetAllParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
