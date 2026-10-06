import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const centuryOptions = ['16', '17', '18', '19', '20'];
  const query = searchParams.get('query') ?? '';

  const updateQuery = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set('query', value);
    } else {
      nextParams.delete('query');
    }

    setSearchParams(nextParams);
  };

  const toggleCentury = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(selected => selected !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''} //
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
            onChange={event => updateQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryOptions.map(century => {
              const isSelected = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button', 'mr-1', { 'is-info': isSelected })}
                  params={{ centuries: toggleCentury(century) }}
                >
                  {century}
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

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
