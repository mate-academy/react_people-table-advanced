import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';
import { SearchLink } from './SearchLink';


export const PeopleFilters = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const gender = searchParams.get("sex") || null;
  const centuries = searchParams.getAll("centuries") || [];


  const updateSearch = (newParams: any) => {
    setSearchParams(getSearchWith(searchParams, newParams));
  }


  const toggleCentury = (centuries: string[], century: string) => {
    return centuries.includes(century)
      ? centuries.filter((cn) => cn !== century)
      : [...centuries, century];
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateSearch({ query: e.target.value || null })
  };


  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ "is-active": !gender })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ "is-active": gender === "m" })}
          params={{ sex: "m" }}

        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ "is-active": gender === "f" })}
          params={{ sex: 'f' }}
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
            value={searchParams.get("query") || ''}
            onChange={(e) => handleSearch(e)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">

            {[16, 17, 18, 19, 20].map((century) =>
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                params={{ centuries: toggleCentury(centuries, century.toString()) }}
              >
                {century}
              </SearchLink>

            )}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${centuries.length > 0 ? " is-outlined" : ""}`}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
