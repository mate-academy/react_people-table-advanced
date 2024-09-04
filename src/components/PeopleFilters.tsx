import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { PersonGenderFilter } from '../types/PersonGenderFilter';
import { CenturyFilter } from '../types/CenturyFilter';
import { SearchParamKeys } from '../types/SearchParamKeys';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParamKeys.QUERY) || '';
  const sex = searchParams.get(SearchParamKeys.SEX);
  const centuries = searchParams.getAll(
    SearchParamKeys.CENTURIES,
  ) as CenturyFilter[];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const newQuery = event.target.value;

    if (newQuery) {
      params.set(SearchParamKeys.QUERY, newQuery);
    } else {
      params.delete(SearchParamKeys.QUERY);
    }

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === PersonGenderFilter.MALE,
          })}
          params={{
            sex: PersonGenderFilter.MALE,
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === PersonGenderFilter.FEMALE,
          })}
          params={{
            sex: PersonGenderFilter.FEMALE,
          }}
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
            {Object.values(CenturyFilter).map(value => (
              <SearchLink
                key={value}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(value),
                })}
                params={{
                  centuries: centuries.includes(value)
                    ? centuries.filter(century => century !== value)
                    : [...centuries, value],
                }}
              >
                {value}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{
                centuries: null,
              }}
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
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
