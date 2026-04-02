import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || 'all';
  const query = searchParams.get('query') || '';
  const centuries: string[] = searchParams.getAll('centuries');

  const onSexChange = (newSex: string) => {
    const params = new URLSearchParams(searchParams);

    if (newSex === 'all') {
      params.delete('sex');
    } else {
      params.set('sex', newSex);
    }

    setSearchParams(params);
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value.trim());

    if (params.get('query') === '') {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const onCenturiesChange = (century: string) => {
    const params = new URLSearchParams(searchParams);

    let newCenturies = [];

    if (centuries.includes(century)) {
      newCenturies = centuries.filter(value => value !== century);
    } else {
      newCenturies = [...centuries, century];
    }

    params.delete('centuries');
    newCenturies.forEach(value => params.append('centuries', value));

    setSearchParams(params);
  };

  const clearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === 'all' ? 'is-active' : ''}
          href="/people"
          onClick={event => {
            event.preventDefault();
            onSexChange('all');
          }}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          href="/people"
          onClick={event => {
            event.preventDefault();
            onSexChange('m');
          }}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          href="/people"
          onClick={event => {
            event.preventDefault();
            onSexChange('f');
          }}
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
            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              href="/people"
              onClick={event => {
                event.preventDefault();
                onCenturiesChange('16');
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              href="/people"
              onClick={event => {
                event.preventDefault();
                onCenturiesChange('17');
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              href="/people"
              onClick={event => {
                event.preventDefault();
                onCenturiesChange('18');
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              href="/people"
              onClick={event => {
                event.preventDefault();
                onCenturiesChange('19');
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              href="/people"
              onClick={event => {
                event.preventDefault();
                onCenturiesChange('20');
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button mr-1 ${centuries.length !== 0 ? 'is-outlined' : ''}`}
              href="/people"
              onClick={event => {
                event.preventDefault();
                clearCenturies();
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="/people"
          onClick={event => {
            event.preventDefault();
            resetFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
