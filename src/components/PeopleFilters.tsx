import { useSearchParams } from "react-router-dom";
import { SearchLink } from "./SearchLink";
import classNames from "classnames";
import { SearchParams, getSearchWith } from "../utils/searchHelper";

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const availableCenturies = ['16', '17', '18', '19', '20']

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search)
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null })
  }

  function toggleCenturies(century: string) {
    return centuries.includes(century)
      ? centuries.filter(singleCentury => singleCentury !== century)
      : [...centuries, century];
  }

  const resetFilters = () => {
    setSearchParams({})
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={classNames({ 'is-active': !sex })} params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink className={classNames({ 'is-active': sex === 'm' })} params={{ sex: 'm' }}>
          Male
        </SearchLink>
        <SearchLink className={classNames({ 'is-active': sex === 'f' })} params={{ sex: 'f' }}>
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
            {availableCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames("button mr-1", {'is-info': centuries.includes(century)})}
                params={{ centuries: toggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames("button is-success", {'is-outlined': centuries.length !== 0})}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          onClick={resetFilters}
          params={{
            centuries: [],
            sex: null,
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth">
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
