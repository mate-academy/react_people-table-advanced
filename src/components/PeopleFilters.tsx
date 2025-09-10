import { SearchLink } from './SearchLink';

const ERA_LIST = ['16', '17', '18', '19', '20'];

interface FilterProps {
  query: string;
  onQueryChange: (text: string) => void;
  sex: string | null;
  centuries: string[];
}

export const PeopleFilters: React.FC<FilterProps> = ({
  query,
  onQueryChange,
  sex,
  centuries,
}) => {
  const renderSexFilter = () => (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink params={{ sex: null }} className={!sex ? 'is-active' : ''}>
        All
      </SearchLink>
      <SearchLink
        params={{ sex: 'm' }}
        className={sex === 'm' ? 'is-active' : ''}
      >
        Male
      </SearchLink>
      <SearchLink
        params={{ sex: 'f' }}
        className={sex === 'f' ? 'is-active' : ''}
      >
        Female
      </SearchLink>
    </p>
  );

  const renderSearchBox = () => (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          type="search"
          className="input"
          data-cy="NameFilter"
          placeholder="Search"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );

  const renderCenturyFilter = () => (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {ERA_LIST.map(era => {
            const updated = centuries.includes(era)
              ? centuries.filter(c => c !== era)
              : [...centuries, era];

            return (
              <SearchLink
                key={era}
                data-cy="century"
                params={{ centuries: updated.length ? updated : null }}
                className={`${
                  centuries.includes(era) ? 'is-info' : ''
                } button mr-1`}
              >
                {era}
              </SearchLink>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );

  const renderReset = () => (
    <div className="panel-block">
      <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={{ query: null, sex: null, centuries: null }}
      >
        Reset all filters
      </SearchLink>
    </div>
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      {renderSexFilter()}
      {renderSearchBox()}
      {renderCenturyFilter()}
      {renderReset()}
    </nav>
  );
};