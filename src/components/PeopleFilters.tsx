import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { FilterTypes } from '../types/FilterTypes';
import { SearchParamsTypes } from '../types/SearchParamsTypes';
import { CenturiesTypes } from '../types/CenturiesTypes';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SearchParamsTypes.query) || '';
  const centuries = searchParams.getAll(SearchParamsTypes.centuries || []);
  const sex = searchParams.get(SearchParamsTypes.sex) || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterTypes).map(([key, value]) => (
          <SearchLink
            params={{
              sex: value || null,
            }}
            key={key}
            className={cn({
              'is-active': value === sex,
            })}
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
            value={query}
            onChange={handleOnChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(CenturiesTypes).map(century => (
              <SearchLink
                params={{
                  centuries: !centuries.includes(century)
                    ? [...centuries, century]
                    : centuries.filter(n => n !== century),
                }}
                key={+century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
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
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length !== 0,
              })}
            >
              {'All'}
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            centuries: null,
            sex: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          {'Reset all filters'}
        </SearchLink>
      </div>
    </nav>
  );
};
