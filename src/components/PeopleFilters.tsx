import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchWith, SearchParams } from '../utils/searchHelper';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex') ?? '';
  const selectedCenturies = searchParams.getAll('centuries');

  const updateSearch = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search, { replace: true });
  };

  const getSearchLink = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    return {
      pathname: location.pathname,
      search: search ? `?${search}` : '',
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === '' ? 'is-active' : ''}
          href={`#/people${getSearchWith(searchParams, { sex: null }) ? `?${getSearchWith(searchParams, { sex: null })}` : ''}`}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          href={`#/people?${getSearchWith(searchParams, { sex: 'm' })}`}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          href={`#/people?${getSearchWith(searchParams, { sex: 'f' })}`}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event =>
              updateSearch({
                query: event.target.value.trim() ? event.target.value : null,
              })
            }
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
              const isSelected = selectedCenturies.includes(century);

              return (
                <a
                  key={century}
                  data-cy="century"
                  className={`button mr-1${isSelected ? ' is-info' : ''}`}
                  href={`#${getSearchLink({ centuries: isSelected ? selectedCenturies.filter(item => item !== century) : [...selectedCenturies, century] }).pathname}${getSearchLink({ centuries: isSelected ? selectedCenturies.filter(item => item !== century) : [...selectedCenturies, century] }).search}`}
                >
                  {century}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href={`#${location.pathname}${getSearchWith(searchParams, { centuries: null }) ? `?${getSearchWith(searchParams, { centuries: null })}` : ''}`}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href={`#${location.pathname}`}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
