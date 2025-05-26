import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { FILTERS } from '../types/Constants';
import { SearchParamsNames } from '../types/SearchParamsNames';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

const { sexFilter, centuriesFilter, resetAllParams } = FILTERS;

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get(SearchParamsNames.Sex) ?? '';
  const centuries = searchParams.getAll(SearchParamsNames.Centuries);
  const centuriesAllParam = centuriesFilter.find(
    searchParam => searchParam.value === null,
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(search);
  };

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
                  [SearchParamsNames.Centuries]: null,
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
          params={resetAllParams}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
