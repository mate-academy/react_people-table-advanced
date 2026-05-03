import { Link, useSearchParams } from 'react-router-dom';
import React, { ChangeEvent } from 'react';
import cn from 'classnames';

export const PeopleFilters = () => {
  const ALL_CENTURIES = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  function getLinkClass(sexValue: string | null) {
    const currentSex = searchParams.get('sex');
    const isActive = sexValue === null ? !currentSex : currentSex === sexValue;

    return cn({ 'is-active': isActive });
  }

  function handleSearchParams(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function toggleCenturies(century: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    params.delete('centuries');

    newCenturies.forEach(cent => params.append('centuries', cent));
    setSearchParams(params);
  }

  function getCenturyClass(century: string) {
    return cn('button mr-1', {
      'is-info': centuries.includes(century),
    });
  }

  function toggleAllCenturies() {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');

    const isAllSelected = currentCenturies.length === ALL_CENTURIES.length;

    params.delete('centuries');

    if (!isAllSelected) {
      ALL_CENTURIES.forEach(cent => params.append('centuries', cent));
    }

    setSearchParams(params);
  }

  function handleSexChange(sexValue: string | null) {
    const params = new URLSearchParams(searchParams);

    if (sexValue) {
      params.set('sex', sexValue);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={getLinkClass(null)} onClick={() => handleSexChange(null)}>
          All
        </a>
        <a className={getLinkClass('m')} onClick={() => handleSexChange('m')}>
          Male
        </a>
        <a className={getLinkClass('f')} onClick={() => handleSexChange('f')}>
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
            onChange={handleSearchParams}
            value={searchParams.get('query') || ''}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {ALL_CENTURIES.map(cent => (
              <button
                key={cent}
                type="button"
                data-cy="century"
                className={getCenturyClass(cent)}
                onClick={() => toggleCenturies(cent)}
              >
                {cent}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              className="button is-success is-outlined"
              onClick={() => toggleAllCenturies()}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={() => {
            setSearchParams('');
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
