import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { CenturiesFilter } from './CenturiesFilter';
import { SexFilter } from './SexFilter';

export const FiltersPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paramsWithQuery = getSearchWith(searchParams, {
      query: e.target.value || null,
    });

    setSearchParams(paramsWithQuery);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

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

      <CenturiesFilter />

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to=".">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
