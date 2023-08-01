import cn from 'classnames';
import { SearchLink } from './SearchLink';
// import { getSearchWith } from '../utils/searchHelper';

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  sex: string | null;
  centuries: string[];
  query: string;
  centuriesArr: string[];
}

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  sex,
  centuries,
  query,
  centuriesArr,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
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
            onChange={(event) => {
              const newSearchParams = new URLSearchParams(
                searchParams.toString(),
              );

              newSearchParams.set('query', event.target.value || '');
              setSearchParams(newSearchParams);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArr.map((century) => (
              <SearchLink
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter((cen) => cen !== century)
                    : [...centuries, century],
                }}
                className={cn('button', 'mr-1',
                  { 'is-info': centuries.includes(century) })}
                data-cy="century"
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
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
          params={{
            query: null,
            sex: null,
            centuries: null,
          }}

        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
