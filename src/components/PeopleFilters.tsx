import cn from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  query: string;
  onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sex: string | null;
  centuries: string[];
}

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  query,
  onChangeQuery,
  sex,
  centuries,
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
            onChange={onChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => {
              return (
                <SearchLink
                  params={{
                    centuries: centuries?.includes(century)
                      ? centuries
                        .filter(centuryToToggle => centuryToToggle !== century)
                      : [...centuries, century],
                  }}
                  className={cn('button mr-1',
                    { 'is-info': centuries.includes(century) })}
                  key={century}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: [],
              }}
              data-cy="centuryALL"
              className={cn('button is-success',
                { 'is-outlined': centuries.length !== 0 })}
            >
              All
            </SearchLink>

          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
