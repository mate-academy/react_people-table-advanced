import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const centuries = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuryFilter = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(
      searchParams,
      { query: event.target.value || null },
    ));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sexFilter })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sexFilter === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sexFilter === 'f' })}
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
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuryFilter.includes(century),
                })}
                params={{
                  centuries: centuryFilter.includes(century)
                    ? centuryFilter.filter(num => num !== century)
                    : [...centuryFilter, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': !!centuryFilter.length })}
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
            sex: null,
            centuries: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
