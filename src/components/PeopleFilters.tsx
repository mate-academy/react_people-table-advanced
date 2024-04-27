import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query' || '');
  const currentSex = searchParams.get('sex' || null);
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = getSearchWith(searchParams, {
      query: event.target.value === '' ? null : event.target.value,
    });

    setSearchParams(newSearch, { replace: true });
  };

  const toggleCentury = (century: string) => {
    const updatedCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return updatedCenturies;
  };

  const sexFilters = [
    { key: 'all', label: 'All', param: null },
    { key: 'm', label: 'Male', param: 'm' },
    { key: 'f', label: 'Female', param: 'f' },
  ];

  const centuriesArray = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(filter => (
          <SearchLink
            key={filter.key}
            params={{ sex: filter.param }}
            className={classNames({ 'is-active': currentSex === filter.param })}
          >
            {filter.label}
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
            {centuriesArray.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: toggleCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button mr-1 is-success', {
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
          params={{
            query: null,
            sex: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
