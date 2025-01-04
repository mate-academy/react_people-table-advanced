import { useContext, useEffect } from 'react';
import { FiltersContext } from '../store/filtersContext';
import { Sex } from '../types';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();

  const {
    sexFilter,
    nameFilter,
    centuryFilter,
    setSexFilter,
    setCenturyFilter,
    setNameFilter,
  } = useContext(FiltersContext);

  useEffect(() => {
    setSexFilter((searchParams.get('sex') as Sex) || Sex.All);
    setNameFilter(searchParams.get('name') || '');
    setCenturyFilter(parseInt(searchParams.get('century') || '0', 10);
  }, [searchParams, setCenturyFilter, setNameFilter, setSexFilter]);

  const params = {
    sex: sexFilter.toString(),
    name: nameFilter.toString(),
    century: centuryFilter,
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(Sex).map((item, index) => (
          <SearchLink
            key={index}
            className="is-active"
            params={{ ...params, sex: item.toString() }}
          >
            {item}
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
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
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
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
