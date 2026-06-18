import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { CENTURIES, SEX_SELECTORS_DATA } from '../constants';

type Props = {
  currentSex: string;
  query: string;
  centuries: string[];
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  currentSex,
  query,
  onQueryChange,
  centuries,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_SELECTORS_DATA.map(sel => (
          <SearchLink
            key={sel.title}
            params={sel.search}
            className={cn(
              (currentSex === sel.search.sex ||
                (currentSex === '' && sel.search.sex === null)) &&
                'is-active',
            )}
          >
            {sel.title}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={onQueryChange}
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
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cen => cen !== century)
                    : [...centuries, century],
                }}
                className={cn(
                  'button',
                  'mr-1',
                  centuries.includes(century) && 'is-info',
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
          params={{ centuries: null, query: null, sex: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
