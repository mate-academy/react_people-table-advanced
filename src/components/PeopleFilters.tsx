import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (newQuery) {
      newParams.set('query', newQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const isCenturySelected = (century: string) => {
    return centuries.includes(century);
  };

  const toggleCentury = (century: string) => {
    const newCenturies = isCenturySelected(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return newCenturies.length > 0 ? newCenturies : null;
  };

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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={`button mr-1 ${isCenturySelected(century) ? 'is-info' : ''}`}
                params={{ centuries: toggleCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
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
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
