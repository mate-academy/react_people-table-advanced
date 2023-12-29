import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';
import { SearchFilterParams } from '../../types/SearchFilterParams';
import { SortType } from '../../types/SortType';
import { FilterBySex } from '../../types/FilterBySex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchFilterParams.Query)
  || SearchFilterParams.None;
  const sex = searchParams.get(SortType.Sex) || SortType.None;
  const centuries = searchParams.getAll(SearchFilterParams.Centuries) || [];
  const allCenturies = ['16', '17', '18', '19', '20'];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': FilterBySex.All })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === FilterBySex.Male })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === FilterBySex.Female })}
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
            {allCenturies.map((century: string) => (
              <SearchLink
                params={{
                  centuries: centuries.includes(century)
                    ? centuries
                      .filter((centuryToFilter: string) => centuryToFilter
                      !== century)
                    : [...centuries, century],
                }}
                key={century}
                data-cy="century"
                className={cn(
                  { 'is-info': centuries.includes(century) },
                  'button',
                  'mr-1',
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
          data-cy="centuryALL"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
