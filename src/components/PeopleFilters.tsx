import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cN from 'classnames';
import { CenturiesFilter } from './CenturiesFilter';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { pathname } = useLocation();

  function getSexFilterClass(value: string | null) {
    return cN({ 'is-active': searchParams.get('sex') === value });
  }

  function getSexFilterLink(sexValue: string | null) {
    return {
      search: getSearchWith({ sex: sexValue }, searchParams),
    };
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value;
    let updatedSearchParams;

    if (searchText) {
      updatedSearchParams = getSearchWith({ query: searchText }, searchParams);
    } else {
      updatedSearchParams = getSearchWith({ query: null }, searchParams);
    }

    setSearchParams(updatedSearchParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link className={getSexFilterClass(null)} to={getSexFilterLink(null)}>
          All
        </Link>
        <Link className={getSexFilterClass('m')} to={getSexFilterLink('m')}>
          Male
        </Link>
        <Link className={getSexFilterClass('f')} to={getSexFilterLink('f')}>
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <CenturiesFilter
                key={century}
                century={century.toString()}
                searchParams={searchParams}
              />
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cN('button is-success', {
                'is-outlined': searchParams.get('centuries') !== null,
              })}
              to={{ search: getSearchWith({ centuries: null }, searchParams) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to={pathname}>
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
