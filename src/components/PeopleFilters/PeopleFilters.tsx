import { SearchLink } from '../SearchLink';

interface Props {
  query: string,
  onChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void,
  sex: string,
  centuries: string[],
}

export const PeopleFilters: React.FC<Props> = ({
  query,
  onChangeQuery,
  sex,
  centuries,
}) => {
  const centuriesList = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={`${!sex && 'is-active'}`}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={`${sex === 'm' && 'is-active'}`}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={`${sex === 'f' && 'is-active'}`}
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
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cent => cent !== century)
                    : [...centuries, century],
                }}
                className={`button mr-1 ${centuries.includes(century) && 'is-info'}`}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={`button is-success ${centuries.length && 'is-outlined'}`}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, centuries: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
