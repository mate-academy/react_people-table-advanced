import { SearchParamKey } from '../../types/searchParams';
import { Link, useSearchParams } from 'react-router-dom';
import SexFilter from './SexFilter';
import CenturyFilter from './CenturyFilter';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import SearchFilter from './SearchFilter';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const buildClearSearch = (current: URLSearchParams) => {
    const next = new URLSearchParams(current.toString());

    next.delete(SearchParamKey.Name);
    next.delete(SearchParamKey.Sex);
    next.delete(SearchParamKey.Centuries);

    return next.toString();
  };

  const handleSearchParamsChange = (params: SearchParams) => {
    setSearchParams(prev => getSearchWith(prev, params));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter searchParams={searchParams} />
      <SearchFilter
        searchParams={searchParams}
        onSearchParamsChange={handleSearchParamsChange}
      />
      <CenturyFilter searchParams={searchParams} />
      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: buildClearSearch(searchParams) }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
