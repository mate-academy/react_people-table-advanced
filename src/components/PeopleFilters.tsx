import { SearchLink } from './SearchLink';

type Props = {
  query: string;
  sex: string | null;
  centuries: string[];
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PeopleFilters = ({
  query,
  sex,
  centuries,
  onQueryChange,
}: Props) => {
  function getUpdatedCenturies(century: string) {
    if (centuries.includes(century)) {
      return centuries.filter(item => item !== century);
    }

    return [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

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

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            onChange={onQueryChange}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{ centuries: getUpdatedCenturies(century) }}
                className={
                  centuries.includes(century)
                    ? 'button mr-1 is-info'
                    : 'button mr-1'
                }
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={
                centuries.length === 0
                  ? 'button is-success'
                  : 'button is-success is-outlined'
              }
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
