import cn from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Sex } from '../types/sex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexQury = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQuerryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }

    setSearchParams(params);
  };

  const handleCenturyChange = (centurry: string) => {
    const params = new URLSearchParams(searchParams);

    if (centurry === 'all') {
      params.delete('centuries');
    } else {
      const newCenturies = centuries.includes(centurry)
        ? centuries.filter(centur => centur !== centurry)
        : [...centuries, centurry];

      params.delete('centuries');
      newCenturies.forEach(cent => params.append('centuries', cent));
    }

    setSearchParams(params);
  };

  const handleStateChange = (sex: Sex) => {
    const params = new URLSearchParams(searchParams);

    if (sex === Sex.All) {
      params.delete('sex');
    } else {
      params.set('sex', sex);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          type="button"
          onClick={() => handleStateChange(Sex.All)}
          className={cn('button', 'mr-1', {
            'is-active': !sexQury,
          })}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => handleStateChange(Sex.Male)}
          className={cn('button', 'mr-1', {
            'is-active': sexQury === Sex.Male,
          })}
        >
          Male
        </button>
        <button
          type="button"
          onClick={() => handleStateChange(Sex.Female)}
          className={cn('button', 'mr-1', {
            'is-active': sexQury === Sex.Female,
          })}
        >
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleQuerryChange}
            value={query}
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
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('16'),
              })}
              type="button"
              onClick={() => handleCenturyChange('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('17'),
              })}
              type="button"
              onClick={() => handleCenturyChange('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('18'),
              })}
              type="button"
              onClick={() => handleCenturyChange('18')}
            >
              18
            </button>

            <button
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('19'),
              })}
              type="button"
              onClick={() => handleCenturyChange('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('20'),
              })}
              type="button"
              onClick={() => handleCenturyChange('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              // className="button is-success is-outlined"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              type="button"
              onClick={() => handleCenturyChange('all')}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
