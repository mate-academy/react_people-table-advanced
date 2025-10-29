import { ChangeEvent, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const centuries = useMemo(() => ['16', '17', '18', '19', '20'], []);

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const newParams = new URLSearchParams(searchParams.toString());

    if (!value.trim()) {
      newParams.delete('query');
    } else {
      newParams.set('query', value);
    }

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const current = searchParams.getAll('centuries');
    const isSelected = current.includes(century);

    const next = isSelected
      ? current.filter(c => c !== century)
      : [...current, century];

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('centuries');
    next.forEach(c => newParams.append('centuries', c));
    setSearchParams(newParams);
  };

  const resetAll = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    // clear all supported filters

    newParams.delete('sex');
    newParams.delete('query');
    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
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
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(c => {
              const isActive = selectedCenturies.includes(c);

              return (
                <button
                  key={c}
                  data-cy="century"
                  type="button"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  onClick={() => toggleCentury(c)}
                >
                  {c}
                </button>
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
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
