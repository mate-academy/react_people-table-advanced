import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { SexParams } from '../types/sexTypes';
import { QueryParams } from '../types/filterParams';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.Query) || '';
  const sex = searchParams.get(QueryParams.Sex) || '';
  const centuries = searchParams.getAll(QueryParams.Centuries) || [];

  const allCenturies = [16, 17, 18, 19, 20];

  const getCenturiesForSearch = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  };

  // const setSearchWith = (params: SearchParams) => {
  //   const newSearch = getSearchWith(searchParams, params);

  //   setSearchParams(newSearch.toString());
  // };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === SexParams.none })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === SexParams.man })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === SexParams.women })}
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
            {allCenturies.map(century => (
              // eslint-disable-next-line react/button-has-type
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: getCenturiesForSearch(century.toString()),
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{
                centuries: allCenturies.map(century => (
                  century.toString())),
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: [],
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
