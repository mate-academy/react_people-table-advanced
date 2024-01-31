import { Link } from 'react-router-dom';
import throttle from 'lodash/throttle';
import { getSearch } from '../utils/customSearchHelper';
import { useMemo } from 'react';

export const PeopleFilters = ({
  setFilteringType,
  searchParams,
  setSearchParams,
  query,
  sex,
  centuries,
}) => {
  // function that transfer params into the helper function and set searchParams
  const memorizedGetSearch = useMemo(() => getSearch, []);

  const setSearchWith = (params) => {
    const search = memorizedGetSearch(params, searchParams);

    setSearchParams(search);
  };

  const throttledHandleInput = throttle((e) => {
    setFilteringType('by_text');
    setSearchWith({ query: e.target.value });

    if (!e.target.value) {
      setSearchWith({ query: null });
    }

    console.log(query);
  }, 500); // Adjust the throttle duration as needed

  const throttledHandleSex = throttle((sexType) => {
    setFilteringType('by_sex');
    setSearchWith({ sex: sexType });
  }, 500);

  const throttledToggleCenturies = throttle((century) => {
    setFilteringType('by_century');
  }, 500);

  const throttledClearCenturies = throttle(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('centuries');
    setSearchParams(params);
  }, 500);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          onClick={() => {
          }}
          to="/people"

        >
          All
        </Link>
        <Link
          onClick={() => throttledHandleSex('m')}
          to={{ search: getSearch({ sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          onClick={() => throttledHandleSex('f')}
          to={{ search: getSearch({ sex: 'f' }) }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={throttledHandleInput}
            value={query}
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
            {[16, 17, 18, 19, 20].map((century) => (
              <Link
                data-cy="century"
                className="button mr-1"
                onClick={() => throttledToggleCenturies(century)}
                to={setSearchWith({ centuries: century })}
              >
                {century}
              </Link>
            ))}

          </div>

          <div className="level-right ml-4">
            <a
              onClick={throttledClearCenturies}
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
