import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const getUpdatedCenturies = (century: string) => {
    if (centuries.includes(century)) {
      return centuries.filter(item => item !== century);
    }

    return [...centuries, century];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={sex === null ? 'is-active' : ''}
          params={{ sex: null }}
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
            value={query}
            onChange={handleQueryChange}
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
            <SearchLink
              data-cy="century"
              className={
                centuries.includes('16') ? 'button mr-1 is-info' : 'button mr-1'
              }
              // href="#/people?centuries=16"
              params={{
                centuries: getUpdatedCenturies('16'),
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                centuries.includes('17') ? 'button mr-1 is-info' : 'button mr-1'
              }
              // href="#/people?centuries=17"
              params={{
                centuries: getUpdatedCenturies('17'),
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                centuries.includes('18') ? 'button mr-1 is-info' : 'button mr-1'
              }
              // href="#/people?centuries=18"
              params={{
                centuries: getUpdatedCenturies('18'),
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                centuries.includes('19') ? 'button mr-1 is-info' : 'button mr-1'
              }
              // href="#/people?centuries=19"
              params={{
                centuries: getUpdatedCenturies('19'),
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                centuries.includes('20') ? 'button mr-1 is-info' : 'button mr-1'
              }
              // href="#/people?centuries=20"
              params={{
                centuries: getUpdatedCenturies('20'),
              }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                centuries.length === 0
                  ? 'button is-success'
                  : 'button is-success is-outlined'
              }
              params={{
                centuries: null,
              }}
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
            query: null,
            sex: null,
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
