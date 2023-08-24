import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export enum SexFilter {
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];
  const centuriesOptions = ['16', '17', '18', '19', '20'];

  const handleCenturiesParams = (century: string) => {
    const newCenturies = (centuries.includes(century))
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return newCenturies;
  };

  function clearCentury() {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    setSearchParams(params);
  }

  const handleSearchTerms = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (!e.target.value) {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === SexFilter.Male })}
          params={{ sex: SexFilter.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === SexFilter.Female,
          })}
          params={{ sex: SexFilter.Female }}
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
            onChange={handleSearchTerms}
          />

          <span
            className="icon is-left"
          >
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={() => clearCentury}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">

            {centuriesOptions.map((c) => (
              <SearchLink
                key={c}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(c),
                })}
                params={{ centuries: handleCenturiesParams(c) }}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
