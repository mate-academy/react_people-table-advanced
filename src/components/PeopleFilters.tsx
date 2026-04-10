import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') ?? '';

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const updatedParams = new URLSearchParams(searchParams.toString());

    if (value === '') {
      updatedParams.delete('query');
    } else {
      updatedParams.set('query', value);
    }

    setSearchParams(updatedParams);
  };

  const getCenturyParams = (century: string) => {
    const isSelected = selectedCenturies.includes(century);
    const nextCenturies = isSelected
      ? selectedCenturies.filter(item => item !== century)
      : [...selectedCenturies, century];

    return nextCenturies.length > 0
      ? { centuries: nextCenturies }
      : { centuries: null };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={`panel-tab ${!selectedSex ? 'is-active' : ''}`}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={`panel-tab ${selectedSex === 'm' ? 'is-active' : ''}`}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={`panel-tab ${selectedSex === 'f' ? 'is-active' : ''}`}
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
            {CENTURIES.map(century => {
              const isSelected = selectedCenturies.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  params={getCenturyParams(century)}
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
