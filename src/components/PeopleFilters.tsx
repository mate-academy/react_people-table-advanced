import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const centuries = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={currentSex === null ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={currentSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={currentSex === 'f' ? 'is-active' : ''}
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
            value={currentQuery}
            onChange={e => {
              const newQuery = e.target.value;

              setSearchParams(
                getSearchWith(searchParams, {
                  query: newQuery || null,
                }),
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => {
              const centuryString = century.toString();

              return (
                <SearchLink
                  key={century}
                  params={{
                    centuries: selectedCenturies.includes(centuryString)
                      ? selectedCenturies.filter(c => c !== centuryString)
                      : [...selectedCenturies, centuryString],
                  }}
                  className={
                    selectedCenturies.includes(centuryString)
                      ? 'button mr-1 is-info'
                      : 'button mr-1'
                  }
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
