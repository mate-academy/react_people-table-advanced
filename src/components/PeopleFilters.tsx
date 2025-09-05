import React from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!e.target.value) {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: string) => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');

    newCenturies.forEach(c => params.append('centuries', c));

    setSearchParams(params);
  };

  const clearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('centuries');
    params.delete('sex');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={`${sex === null ? 'is-active' : ''}`}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={`${sex === 'm' ? 'is-active' : ''}`}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={`${sex === 'f' ? 'is-active' : ''}`}
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
            value={query || ''}
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
            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? `is-info` : 0}`}
              onClick={() => toggleCentury('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? `is-info` : 0}`}
              onClick={() => toggleCentury('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? `is-info` : 0}`}
              onClick={() => toggleCentury('18')}
            >
              18
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? `is-info` : 0}`}
              onClick={() => toggleCentury('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? `is-info` : 0}`}
              onClick={() => toggleCentury('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={`button  ${centuries.length === 0 ? 'is-success' : 'is-success is-outlined'}`}
              onClick={() => clearCenturies()}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => clearAllFilters()}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
