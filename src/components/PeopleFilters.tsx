/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import { Sex } from '../types/sex';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { useSearchParamsContext } from '../store/SearchParamsContext';

export const PeopleFilters = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const { searchParams, setSearchParams, query, sex, centuries } =
    useSearchParamsContext();

  function setSearchWith(params: any) {
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
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === Sex.Male })}
          params={{ sex: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === Sex.Female })}
          params={{ sex: Sex.Female }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={handleQueryChange}
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
            {[16, 17, 18, 19, 20].map(num => (
              <SearchLink
                key={num}
                params={{
                  centuries: centuries.includes(num)
                    ? centuries.filter(c => c !== num).map(String)
                    : [...centuries, num].map(String),
                }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(num),
                })}
              >
                {num}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: null,
              }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
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
            query: null,
            centuries: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
