import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex') || 'all';
  const currentQuery = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleSexChange = (value: 'm' | 'f' | '') => {
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('sex');
    } else {
      params.set('sex', value);
    }

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value.trim()) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));
    setSearchParams(params);
  };

  const resetCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const resetAllFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');
    params.delete('sort');
    params.delete('order');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters {selectedSex}</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': selectedSex === 'all' })}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            handleSexChange('');
          }}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': selectedSex === 'm' })}
          href="#/people?sex=m"
          onClick={event => {
            event.preventDefault();
            handleSexChange('m');
          }}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': selectedSex === 'f' })}
          href="#/people?sex=f"
          onClick={event => {
            event.preventDefault();
            handleSexChange('f');
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
            value={currentQuery}
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
              <a
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                key={century}
                onClick={event => {
                  event.preventDefault();
                  toggleCentury(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={event => {
                event.preventDefault();
                resetCenturies();
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
          href="#/people"
          onClick={event => {
            event.preventDefault();
            resetAllFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
