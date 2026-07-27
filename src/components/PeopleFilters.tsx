import { useSearchParams } from 'react-router-dom';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value.length > 0) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleSexChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function handleCenturyChange(value: string) {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');

    if (value === '') {
      params.delete('centuries');
    } else if (currentCenturies.includes(value)) {
      params.delete('centuries');

      currentCenturies
        .filter(c => c !== value)
        .forEach(c => params.append('centuries', c));
    } else {
      params.append('centuries', value);
    }

    setSearchParams(params);
  }

  function handleReset() {
    setSearchParams('');
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === '' ? 'is-active' : ''}
          onClick={() => handleSexChange('')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => handleSexChange('f')}
        >
          Female
        </a>
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
            <a
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('16') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('17') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('18') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('19') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('20') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${searchParams.getAll('centuries').length > 0 ? 'is-outlined' : ''}`}
              onClick={() => handleCenturyChange('')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => handleReset()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
