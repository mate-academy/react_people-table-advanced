import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const updateQueryParams = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParams({ query: event.target.value || null });
  };

  const toggleCenturyFilter = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const getSexClass = (selectedSex: string) => ({
    'is-active': sex === selectedSex,
  });

  const centuriesList = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames('navbar-item', getSexClass(''))}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames('navbar-item', getSexClass('m'))}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames('navbar-item', getSexClass('f'))}
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
            {centuriesList.map(century => {
              const updatedCenturies = toggleCenturyFilter(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': updatedCenturies.includes(century),
                  })}
                  params={{ centuries: updatedCenturies }}
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
                'is-outlined': centuries.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
          params={{
            centuries: [],
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
