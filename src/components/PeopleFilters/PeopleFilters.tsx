import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuryFilter = searchParams.getAll('century') || [];
  const sex = searchParams.get('sex');
  const arrOfCentury = ['16', '17', '18', '19', '20'];
  const male = 'm';
  const female = 'f';
  const resetFilters = {
    sex: null,
    centuries: null,
    query: null,
  };

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
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === male })}
          params={{ sex: male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === female })}
          params={{ sex: female }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={handleQueryChange}
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
            {arrOfCentury.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuryFilter.includes(century),
                })}
                params={{
                  centuryFilter: centuryFilter.includes(century)
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
              className={classNames('button is-success', {
                'is-outlined': centuryFilter.length > 0,
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
          params={resetFilters}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
