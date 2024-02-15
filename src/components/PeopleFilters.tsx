import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';

  const centuriesCount = [16, 17, 18, 19, 20];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function handelCenturyChange(century: string) {
    if (!century) {
      return { centuries: [] };
    }

    const newCenturies = centuries.includes(century)
      ? centuries.filter(number => number !== century)
      : [...centuries, century];

    return { centuries: newCenturies };
  }

  const buttonClassName = (century: string) => (
    `button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`
  );

  const handleCenturyAllClick = () => {
    const params = new URLSearchParams(searchParams);

    params.set('centuries', '');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!sex ? 'is-active' : ''}
          params={{ sex: '' }}
        >
          All
        </SearchLink>

        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
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
            {centuriesCount.map(century => (
              <SearchLink
                key={century}
                data-cy={`century-${century}`}
                className={buttonClassName(century.toString())}
                params={handelCenturyChange(century.toString())}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ sex, query, centuries: [] }}
              onClick={handleCenturyAllClick}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: [] }}
          onClick={handleCenturyAllClick}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
