import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextValue.trim()) {
      nextParams.set('query', nextValue);
    } else {
      nextParams.delete('query');
    }

    setSearchParams(nextParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!sex ? 'is-active' : ''}
          params={{ sex: null }}
          href="#/people"
        >
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
          href="#/people?sex=m"
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
          href="#/people?sex=f"
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
            {centuries.map(century => {
              const isSelected = selectedCenturies.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  params={{
                    centuries: isSelected
                      ? selectedCenturies.filter(item => item !== century)
                      : [...selectedCenturies, century],
                  }}
                  href={`#/people?centuries=${century}`}
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
              href="#/people"
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
          href="#/people"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
