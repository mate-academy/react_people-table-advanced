import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Sex } from '../types/Sex';
import { centuryButtons } from '../utils/peopleHelper';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || Sex.All;
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': sex === Sex.All })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === Sex.M })}
          params={{ sex: Sex.M }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === Sex.F })}
          params={{ sex: Sex.F }}
        >
          Female
        </SearchLink>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleQueryChange}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryButtons.map(centuryButton => {
              const isSelected = centuries.includes(centuryButton);

              return (
                <SearchLink
                  key={centuryButton}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': isSelected,
                  })}
                  params={{
                    centuries: isSelected
                      ? centuries.filter(century => century !== centuryButton)
                      : [...centuries, centuryButton],
                  }}
                >
                  {centuryButton}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
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
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
