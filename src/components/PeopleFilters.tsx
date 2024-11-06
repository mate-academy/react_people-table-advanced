import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { FilterPeople } from '../types/FilterPeople';
import { Params } from '../types/Params';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(Params.query) || '';
  const centuries = searchParams.getAll(Params.centuries || []);

  const sex = searchParams.get(Params.sex) || '';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterPeople).map(([key, value]) => (
          <SearchLink
            className={cn({ 'is-active': value === sex })}
            params={{ sex: value || null }}
            key={key}
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
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(Century => (
              <SearchLink
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': Century.includes(Century),
                })}
                params={{
                  century: Century.includes(Century)
                    ? centuries.filter(curr => curr !== Century)
                    : [...centuries, Century],
                }}
                key={Century}
              >
                {Century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length !== 0,
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
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          {'Reset all filters'}
        </SearchLink>
      </div>
    </nav>
  );
};
