import { useNavigate, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const FilterLinks = {
    All: null,
    Male: 'm',
    Female: 'f',
  };

  const centuriesArray = [16, 17, 18, 19, 20];

  const handleQueryParam = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    navigate({
      search: getSearchWith(searchParams, { query: value || null }),
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterLinks).map(([key, value]) => {
          return (
            <SearchLink
              key={key}
              className={cn({
                'is-active': sex === value,
              })}
              params={{ sex: value }}
            >
              {key}
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
            value={query}
            onChange={handleQueryParam}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map(century => {
              const centuryToString = `${century}`;

              return (
                <SearchLink
                  key={century}
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(centuryToString),
                  })}
                  params={{
                    centuries: centuries.includes(centuryToString)
                      ? centuries.filter(param => param !== centuryToString)
                      : [...centuries, centuryToString],
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
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
          params={{ query: null, centuries: null, sex: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
